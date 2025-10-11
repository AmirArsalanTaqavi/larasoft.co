'use client'; 

import React, { useState, useMemo } from 'react';
// Ensure this import path is correct
import { sendQuoteRequest } from '@/app/actions/index'; 

// Define the core tiers' base costs (IN MILLIONS OF TOMANS)
const BASE_COST_TOMANS: number[] = [5000000, 8000000, 12000000, 18000000, 25000000, 30000000];

// Define interfaces
interface PricingInputs {
    clients: number; servers: number; voip_count: number; monthly_visits: number; 
    out_of_city_visits: number; emergency: number; cctv_count: number; 
    antivirus_av: boolean; printers_scanners_count: number; 
    branches: number; mikrotik_units: number; vms: number;
}
interface LeadFormState {
    name: string; phone: string; email: string;
}

// 1. Core Logic: Base Cost Tiers (Non-Overlapping and Sequential)
const calculateBaseCost = (servers: number, clients: number): number => {
    // TIER 6: > 64 clients, <= 3 servers
    if (clients > 64 && servers <= 3) return BASE_COST_TOMANS[5]; 
    // TIER 5: 41-64 clients, <= 3 servers
    if (clients > 40 && clients <= 64 && servers <= 3) return BASE_COST_TOMANS[4];
    // TIER 4: 16-40 clients, <= 3 servers
    if (clients > 15 && clients <= 40 && servers <= 3) return BASE_COST_TOMANS[3];
    // TIER 3: 13-15 clients, <= 1 server
    if (clients > 12 && clients <= 15 && servers <= 1) return BASE_COST_TOMANS[2];
    // TIER 2: 7-12 clients, 0 server
    if (clients > 6 && clients <= 12 && servers === 0) return BASE_COST_TOMANS[1];
    // TIER 1: Smallest base case (1-6 clients, 0 server)
    if (clients >= 1 && clients <= 6 && servers === 0) return BASE_COST_TOMANS[0];

    // Fail-Safe: Default to TIER 4 (18M Toman) for undefined scenarios.
    return BASE_COST_TOMANS[3]; 
};

// 2. Main Calculation Function (All calculations in Tomans)
const calculateTotalCost = (inputs: PricingInputs): number => {
    const { 
        clients, servers, voip_count, monthly_visits, out_of_city_visits, 
        emergency, cctv_count, antivirus_av, printers_scanners_count, 
        branches, mikrotik_units, vms 
    } = inputs;

    const baseCostToman = calculateBaseCost(servers, clients);
    let totalCostToman = baseCostToman;
    const tierIndex = BASE_COST_TOMANS.indexOf(baseCostToman); 
    
    // ADD-ONS: (All costs in Tomans)
    totalCostToman += vms > 5 ? (vms - 5) * 500000 : 0; 
    totalCostToman += antivirus_av ? 1000000 : 0; 
    const excessPrinters = Math.max(printers_scanners_count - 5, 0);
    totalCostToman += Math.ceil(excessPrinters / 5) * 500000;
    const includedBranches = (tierIndex <= 3) ? 1 : 2;
    totalCostToman += Math.max(branches - includedBranches, 0) * 1000000;
    const excessMikrotik = Math.max(mikrotik_units - 4, 0);
    totalCostToman += excessMikrotik * 500000;

    // VoIP/CCTV Logic
    totalCostToman += (voip_count > 0 ? 1000000 : 0) + (voip_count > 16 ? Math.ceil((voip_count - 16) / 16) * 500000 : 0);
    totalCostToman += (cctv_count > 0 ? 1000000 : 0) + (cctv_count > 16 ? Math.ceil((cctv_count - 16) / 16) * 500000 : 0);

    // Visits/Emergency Logic
    const includedVisits = (tierIndex <= 1) ? 1 : 2;
    totalCostToman += Math.max(monthly_visits - includedVisits, 0) * 500000;
    totalCostToman += out_of_city_visits * 1000000;
    totalCostToman += Math.max(emergency - 1, 0) * 1000000;

    return totalCostToman;
};

// Formatting Helper
const formatToToman = (tomanAmount: number) => {
    return tomanAmount.toLocaleString('fa-IR'); 
};


// --- HELPERS (Input/Checkbox Fields) ---
// --- HELPERS (Updated to accept handlers) ---

// Updated InputField to use a provided onChange handler
const InputField = ({ label, name, value, type = 'number', unit = '', onChange }: { 
    label: string, 
    name: keyof PricingInputs, 
    value: number, 
    type?: string, 
    unit?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void // <--- NEW PROP
}) => (
    <div className="flex justify-between items-start border-primary">
        
        <div className="flex text-right">
            <label htmlFor={name} className="text-text font-medium">{label}</label>
            {unit && <span className="text-gray-400 text-xs pr-2 mt-1.5">{unit}</span>}
        </div>
        
        <input
            type={type}
            id={name}
            name={name}
            min="0"
            value={value}
            onChange={onChange} // <--- USE THE PROP HERE
            className="w-24 text-center border border-primary rounded-md p-1 focus:ring-accent focus:border-accent bg-background text-text"
        />
    </div>
);

// Updated CheckboxField to use a provided onChange handler
const CheckboxField = ({ label, name, checked, onChange }: { 
    label: string, 
    name: keyof PricingInputs, 
    checked: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void // <--- NEW PROP
}) => (
    <div className="flex justify-between items-center p-3 border-b border-primary last:border-b-0">
        <label htmlFor={name} className="text-text font-medium">{label}</label>
        <input
            type="checkbox"
            id={name}
            name={name}
            checked={checked}
            onChange={onChange} // <--- USE THE PROP HERE
            className="h-5 w-5 text-accent focus:ring-accent border-primary rounded bg-background"
        />
    </div>
);


// --- PRICE LOGIC TABLE COMPONENT ---
const PricingLogicTable = () => (
    <div className="bg-background p-6 rounded-xl border border-primary mt-8">
        <h3 className="text-xl font-bold text-primary mb-4 border-b border-secondary pb-2">
            جدول محاسبه هزینه پایه (Tiering)
        </h3>
        <p className="text-sm text-gray-400 mb-4">
            هزینه پایه ماهانه بر اساس تعداد کاربران (کلاینت‌ها) و سرورهای فیزیکی محاسبه می‌شود.
        </p>
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm text-text">
                <thead className="bg-primary text-background">
                    <tr className="text-center">
                        <th className="py-2 px-4 border border-background">Tier</th>
                        <th className="py-2 px-4 border border-background">تعداد کلاینت‌ها</th>
                        <th className="py-2 px-4 border border-background">تعداد سرورها</th>
                        <th className="py-2 px-4 border border-background">هزینه پایه (تومان)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-secondary text-center">
                        <td className="py-2 px-4 border border-background">۱</td>
                        <td className="py-2 px-4 border border-background">۱ تا ۶</td>
                        <td className="py-2 px-4 border border-background">۰</td>
                        <td className="py-2 px-4 border border-background">۵,۰۰۰,۰۰۰</td>
                    </tr>
                    <tr className="bg-background text-center">
                        <td className="py-2 px-4 border border-background">۲</td>
                        <td className="py-2 px-4 border border-background">۷ تا ۱۲</td>
                        <td className="py-2 px-4 border border-background">۰</td>
                        <td className="py-2 px-4 border border-background">۸,۰۰۰,۰۰۰</td>
                    </tr>
                    <tr className="bg-secondary text-center">
                        <td className="py-2 px-4 border border-background">۳</td>
                        <td className="py-2 px-4 border border-background">۱۳ تا ۱۵</td>
                        <td className="py-2 px-4 border border-background">۱ یا کمتر</td>
                        <td className="py-2 px-4 border border-background">۱۲,۰۰۰,۰۰۰</td>
                    </tr>
                    <tr className="bg-background text-center">
                        <td className="py-2 px-4 border border-background">۴</td>
                        <td className="py-2 px-4 border border-background">۱۶ تا ۴۰</td>
                        <td className="py-2 px-4 border border-background">۳ یا کمتر</td>
                        <td className="py-2 px-4 border border-background">۱۸,۰۰۰,۰۰۰</td>
                    </tr>
                    <tr className="bg-secondary text-center">
                        <td className="py-2 px-4 border border-background">۵</td>
                        <td className="py-2 px-4 border border-background">۴۱ تا ۶۴</td>
                        <td className="py-2 px-4 border border-background">۳ یا کمتر</td>
                        <td className="py-2 px-4 border border-background">۲۵,۰۰۰,۰۰۰</td>
                    </tr>
                    <tr className="bg-background text-center">
                        <td className="py-2 px-4 border border-background">۶</td>
                        <td className="py-2 px-4 border border-background">بیشتر از ۶۴</td>
                        <td className="py-2 px-4 border border-background">۳ یا کمتر</td>
                        <td className="py-2 px-4 border border-background">۳۰,۰۰۰,۰۰۰</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);


// --- MAIN COMPONENT ---
export default function PriceCalculator() {
    const [inputs, setInputs] = useState<PricingInputs>({
        clients: 1, servers: 0, voip_count: 0, monthly_visits: 1, 
        out_of_city_visits: 0, emergency: 0, cctv_count: 0, 
        antivirus_av: false, printers_scanners_count: 0, 
        branches: 1, mikrotik_units: 0, vms: 0
    });
    const [leadForm, setLeadForm] = useState<LeadFormState>({ name: '', phone: '', email: '' });
    const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formMessage, setFormMessage] = useState<string>('');
    const [isCommitted, setIsCommitted] = useState(false); // Commitment State

    const totalCost = useMemo(() => calculateTotalCost(inputs), [inputs]);
    const totalCostToman = totalCost;
    const totalCostRial = totalCost * 10;
    const discountedCostToman = Math.round(totalCostToman * 0.8);

    const finalDisplayedCost = isCommitted ? discountedCostToman : totalCostToman;
    
    // Handlers
    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs(prev => ({ ...prev, [e.target.name]: parseInt(e.target.value) || 0 }));
    };
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.checked }));
    };
    const handleLeadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLeadForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    // Formats inputs for the email body (placeholder for brevity)
    const formatQuoteInputs = (): string => {
        return Object.entries(inputs)
            .map(([key, value]) => {
                const displayKey = {
                    clients: 'کلاینت', servers: 'سرور', voip_count: 'VoIP', monthly_visits: 'بازدید ماهانه',
                    out_of_city_visits: 'بازدید خارج شهر', emergency: 'اضطراری', cctv_count: 'دوربین',
                    antivirus_av: 'آنتی‌ویروس', printers_scanners_count: 'پرینتر', branches: 'شعب',
                    mikrotik_units: 'میکروتیک/AP', vms: 'VMs'
                }[key] || key;
                return `${displayKey}: ${typeof value === 'boolean' ? (value ? 'بله' : 'خیر') : value}`;
            })
            .join(', \n');
    };

    const handleQuoteSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
        setFormStatus('loading');
        setFormMessage('');

        if (!leadForm.name || !leadForm.phone) { 
            setFormStatus('error');
            setFormMessage('لطفاً نام و شماره تماس خود را وارد کنید.');
            return;
        }

        const quoteInputs = formatQuoteInputs();

        // NOTE: The actual sendQuoteRequest must be defined in src/app/actions/index.ts
        const result = await sendQuoteRequest({
            ...leadForm,
            quoteSummary: formatToToman(finalDisplayedCost),
            quoteInputs: quoteInputs
        });

        if (result.success) {
            setFormStatus('success');
            setFormMessage(result.message);
            setLeadForm({ name: '', phone: '', email: '' });
        } else {
            setFormStatus('error');
            setFormMessage(result.message || 'خطا در ارسال درخواست.');
        }
    };


    return (
        <div className="bg-background p-6 rounded-xl shadow-2xl border-t-4 border-primary mt-12">
            <h2 className="text-3xl font-extrabold text-primary text-center mb-6">
                ماشین حساب آنلاین هزینه پشتیبانی
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* --- 1. Inputs Section (RESTORED & FIXED CODE) --- */}
            <div className="lg:col-span-2 border border-primary rounded-lg p-4 bg-background space-y-6">
                
                <h3 className="text-xl font-bold text-primary mb-2 border-b border-primary pb-2">
                    ورودی‌های تجهیزات و سرویس‌ها
                </h3>
                {/* Primary Asset Group */}
                <div className="space-y-3">
                    <InputField label="تعداد کاربران/کلاینت‌ها" name="clients" value={inputs.clients} onChange={handleNumberChange} />
                    <InputField label="تعداد سرورهای فیزیکی" name="servers" value={inputs.servers} onChange={handleNumberChange} />
                    <InputField label="تعداد ماشین‌های مجازی (VMs)" name="vms" value={inputs.vms} unit="[۵ عدد اول رایگان]" onChange={handleNumberChange} />
                    <InputField label="تعداد شعب/دفاتر جداگانه" name="branches" value={inputs.branches} unit="[۱ یا ۲ عدد رایگان]" onChange={handleNumberChange} />
                </div>

                <h3 className="text-xl font-bold text-primary mt-6 mb-2 border-b border-primary pb-2">
                    تجهیزات جانبی و شبکه‌ای
                </h3>
                <div className="space-y-3">
                    <InputField label="تعداد دستگاه‌های میکروتیک/AP" name="mikrotik_units" value={inputs.mikrotik_units} unit="[۴ عدد رایگان]" onChange={handleNumberChange} />
                    <InputField label="تعداد کاربران VoIP" name="voip_count" value={inputs.voip_count} unit="[۱۶ عدد اول ۱م تومان]" onChange={handleNumberChange} />
                    <InputField label="تعداد پرینتر/اسکنر" name="printers_scanners_count" value={inputs.printers_scanners_count} unit="[۵ عدد اول رایگان]" onChange={handleNumberChange} />
                    <InputField label="تعداد دوربین‌های مدار بسته" name="cctv_count" value={inputs.cctv_count} unit="[۱۶ عدد اول ۱م تومان]" onChange={handleNumberChange} />
                    <CheckboxField label="پوشش آنتی‌ویروس مرکزی" name="antivirus_av" checked={inputs.antivirus_av} onChange={handleCheckboxChange} />
                </div>

                {/* *** RESTORED SECTION: الزامات پاسخگویی و پشتیبانی *** */}
                <h3 className="text-xl font-bold text-primary mt-6 mb-2 border-b border-primary pb-2">
                    الزامات پاسخگویی و پشتیبانی
                </h3>
                <div className="space-y-3">
                    <InputField label="تعداد بازدید در محل (ماهانه)" name="monthly_visits" value={inputs.monthly_visits} unit="[۲ یا ۱ عدد رایگان]" onChange={handleNumberChange} />
                    <InputField label="تعداد بازدید خارج از شهر" name="out_of_city_visits" value={inputs.out_of_city_visits} onChange={handleNumberChange} />
                    <InputField label="تعداد دفعات نیاز به سرویس اضطراری (24/7)" name="emergency" value={inputs.emergency} onChange={handleNumberChange} />
                </div>
            </div>
            {/* --- END RESTORED INPUT SECTION --- */}

                {/* --- 2. Result Section (FINAL STYLING FIX) --- */}
                <div className="lg:col-span-1 p-6 bg-secondary text-text rounded-lg flex flex-col justify-between shadow-xl">
                    <div>
                        <h3 className="text-2xl font-semibold mb-6 text-center text-accent border-b border-primary pb-2">
                            هزینه محاسبه شده (ماهانه)
                        </h3>
                        
                        {/* 🎯 Price Display 🎯 */}
                        <div className="text-center">
                            {/* Line-through price (xl font size) */}
                            {isCommitted && (
                                <p className="text-xl font-bold text-gray-400 line-through">
                                    {formatToToman(totalCostToman)} تومان
                                </p>
                            )}
                            {/* Final Price (Massive 6xl font) */}
                            <p className="text-6xl font-extrabold tracking-wider text-text mt-1">
                                {formatToToman(finalDisplayedCost)}
                            </p>
                            <p className="text-lg mt-2 font-light text-accent">
                                تومان در ماه
                            </p>
                            <p className="text-sm mt-1 font-light text-gray-400">
                                ({formatToToman(totalCostRial)} ریال)
                            </p>
                        </div>

                        {/* 🎯 The Commitment Checkbox (Now using clean, controlled spacing) 🎯 */}
                        <div className="mt-8 p-4 bg-background rounded-lg border border-primary">
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isCommitted}
                                    onChange={() => setIsCommitted(!isCommitted)}
                                    className="h-5 w-5 text-accent focus:ring-accent border-primary rounded bg-background ml-3"
                                />
                                <span className="text-lg font-bold text-accent">
                                    تعهد ۲۴ ماهه برای دریافت ۲۰٪ تخفیف
                                </span>
                            </label>
                            {isCommitted && (
                                <p className="text-xs text-gray-400 mt-2">
                                    *قیمت بالا شامل ۲۰٪ تخفیف سال اول است.
                                </p>
                            )}
                        </div>
                    </div>
                    
                    {/* --- Lead Generation Form (Reduced Spacing) --- */}
                    <form onSubmit={handleQuoteSubmit} className="mt-6 pt-4 border-t border-primary space-y-3">
                        <h4 className="text-lg font-semibold text-text pb-2">
                            درخواست تماس و پیش فاکتور
                        </h4>
                        
                        <input
                            type="text" name="name" placeholder="نام و نام خانوادگی / شرکت" required
                            value={leadForm.name} onChange={handleLeadChange}
                            className="w-full p-2 rounded bg-background text-text border border-primary focus:ring-accent focus:border-accent"
                        />
                        <input
                            type="tel" name="phone" placeholder="شماره تماس (ضروری)" required
                            value={leadForm.phone} onChange={handleLeadChange}
                            className="w-full p-2 rounded bg-background text-text border border-primary focus:ring-accent focus:border-accent"
                        />
                         <input
                            type="email" name="email" placeholder="ایمیل (اختیاری)"
                            value={leadForm.email} onChange={handleLeadChange}
                            className="w-full p-2 rounded bg-background text-text border border-primary focus:ring-accent focus:border-accent"
                        />
                        
                        <button
                            type="submit" disabled={formStatus === 'loading'}
                            className={`w-full font-bold py-3 rounded-lg transition-colors shadow-lg ${
                                formStatus === 'loading' ? 'bg-gray-400' : 'bg-accent hover:bg-accent-dark text-background'
                            }`}
                        >
                            {formStatus === 'loading' ? 'در حال ارسال...' : 'ارسال درخواست پیش فاکتور'}
                        </button>
                        
                        {formMessage && (
                            <p className={`text-sm text-center font-semibold ${formStatus === 'success' ? 'text-green-300' : 'text-red-400'}`}>
                                {formMessage}
                            </p>
                        )}
                    </form>
                </div>
                {/* --- END RESTORED RESULT SECTION --- */}
            </div>
            
            {/* --- Pricing Logic Table (Final Placement) --- */}
            <div className="lg:col-span-3">
                <PricingLogicTable /> 
            </div>
            {/* --- End Pricing Logic Table --- */}
        </div>
    );
}