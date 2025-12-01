// src/components/PriceCalculator.tsx
'use client';

import React, { useState, useMemo } from 'react';
// import { sendQuoteRequest } from '@/app/actions/index'; // kept commented as in original

// shadcn/ui components (you already have these in your project)
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

import { Button } from '@/components/ui/button';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DotPattern from './ui/dot-pattern';

// Define interfaces
interface PricingInputs {
  clients: number;
  servers: number;
  voip_count: number;
  monthly_visits: number;
  out_of_city_visits: number;
  emergency: number;
  cctv_count: number;
  antivirus_av: boolean;
  printers_scanners_count: number;
  branches: number;
  mikrotik_units: number;
  vms: number;
}
interface LeadFormState {
  name: string;
  phone: string;
  email: string;
}

// Define the core tiers' base costs (IN MILLIONS OF TOMANS)
const BASE_COST_TOMANS: number[] = [
  5000000, 8000000, 12000000, 18000000, 25000000, 30000000,
];

// 1. Base Cost Logic (FINAL: MAX of Server Price vs. Client Price)
const calculateBaseCost = (servers: number, clients: number): number => {
  let priceFromServer = 0;
  let priceFromClient = 0;

  // Server-based
  if (servers > 5) {
    priceFromServer = BASE_COST_TOMANS[5];
  } else if (servers === 4 || servers === 5) {
    priceFromServer = BASE_COST_TOMANS[4];
  } else if (servers === 3) {
    priceFromServer = BASE_COST_TOMANS[3];
  } else if (servers === 1 || servers === 2) {
    priceFromServer = BASE_COST_TOMANS[2];
  }

  // Client-based
  if (clients > 64) {
    priceFromClient = BASE_COST_TOMANS[5];
  } else if (clients >= 41) {
    priceFromClient = BASE_COST_TOMANS[4];
  } else if (clients >= 16) {
    priceFromClient = BASE_COST_TOMANS[3];
  } else if (clients >= 13) {
    priceFromClient = BASE_COST_TOMANS[2];
  } else if (clients >= 7) {
    priceFromClient = BASE_COST_TOMANS[1];
  } else if (clients >= 1) {
    priceFromClient = BASE_COST_TOMANS[0];
  }

  return Math.max(priceFromServer, priceFromClient);
};

// 2. Main Calculation Function (All calculations in Tomans)
const calculateTotalCost = (inputs: PricingInputs): number => {
  const {
    clients,
    servers,
    voip_count,
    monthly_visits,
    out_of_city_visits,
    emergency,
    cctv_count,
    antivirus_av,
    printers_scanners_count,
    branches,
    mikrotik_units,
    vms,
  } = inputs;

  const baseCostToman = calculateBaseCost(servers, clients);
  let totalCostToman = baseCostToman;
  const tierIndex = BASE_COST_TOMANS.indexOf(baseCostToman);

  // ADD-ONS
  totalCostToman += vms > 5 ? (vms - 5) * 500000 : 0;
  totalCostToman += antivirus_av ? 1000000 : 0;
  const excessPrinters = Math.max(printers_scanners_count - 5, 0);
  totalCostToman += Math.ceil(excessPrinters / 5) * 500000;
  const includedBranches = tierIndex <= 3 ? 1 : 2;
  totalCostToman += Math.max(branches - includedBranches, 0) * 1000000;
  const excessMikrotik = Math.max(mikrotik_units - 4, 0);
  totalCostToman += excessMikrotik * 500000;
  totalCostToman +=
    (voip_count > 0 ? 1000000 : 0) +
    (voip_count > 16 ? Math.ceil((voip_count - 16) / 16) * 500000 : 0);
  totalCostToman +=
    (cctv_count > 0 ? 1000000 : 0) +
    (cctv_count > 16 ? Math.ceil((cctv_count - 16) / 16) * 500000 : 0);
  const includedVisits = tierIndex <= 1 ? 1 : 2;
  totalCostToman += Math.max(monthly_visits - includedVisits, 0) * 500000;
  totalCostToman += out_of_city_visits * 1000000;
  totalCostToman += Math.max(emergency - 1, 0) * 1000000;

  return totalCostToman;
};

// Formatting Helper
const formatToToman = (tomanAmount: number) => {
  return tomanAmount.toLocaleString('fa-IR');
};

// --- PRICE LOGIC TABLE COMPONENT (kept intact visually) ---
const PricingLogicTable = () => (
  <div className='bg-card relative mt-8 rounded-md border p-6'>
    <h3 className='text-primary border-secondary mb-4 border-b pb-2 text-xl font-bold'>
      جدول محاسبه هزینه پایه (Tiering)
    </h3>
    <p className='mb-4 text-sm text-gray-400'>
      هزینه پایه ماهانه بر اساس تعداد کاربران (کلاینت‌ها) و سرورهای فیزیکی
      محاسبه می‌شود.
    </p>
    <div className='overflow-x-auto'>
      <table className='min-w-full table-auto text-center'>
        <TableHeader>
          <TableRow>
            <TableHead className='text-center'>Tier</TableHead>
            <TableHead className='text-center'>تعداد کلاینت‌ها</TableHead>
            <TableHead className='text-center'>تعداد سرورها</TableHead>
            <TableHead className='text-center'>هزینه پایه (تومان)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>۱</TableCell>
            <TableCell>۱ تا ۶</TableCell>
            <TableCell>۰</TableCell>
            <TableCell>۵,۰۰۰,۰۰۰</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>۲</TableCell>
            <TableCell>۷ تا ۱۲</TableCell>
            <TableCell>۰</TableCell>
            <TableCell>۸,۰۰۰,۰۰۰</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>۳</TableCell>
            <TableCell>۱۳ تا ۱۵</TableCell>
            <TableCell>۲ یا کمتر</TableCell>
            <TableCell>۱۲,۰۰۰,۰۰۰</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>۴</TableCell>
            <TableCell>۱۶ تا ۴۰</TableCell>
            <TableCell>۳</TableCell>
            <TableCell>۱۸,۰۰۰,۰۰۰</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>۵</TableCell>
            <TableCell>۴۱ تا ۶۴</TableCell>
            <TableCell>۵ یا کمتر</TableCell>
            <TableCell>۲۵,۰۰۰,۰۰۰</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>۶</TableCell>
            <TableCell>بیشتر از ۶۴</TableCell>
            <TableCell>۵ یا بیشتر</TableCell>
            <TableCell>۳۰,۰۰۰,۰۰۰</TableCell>
          </TableRow>
        </TableBody>
      </table>
    </div>
  </div>
);

// --- HELPERS (reimplemented using shadcn inputs) ---
// The InputField keeps the same external API but uses shadcn Input internally.
const InputField = ({
  label,
  name,
  value,
  type = 'number',
  unit = '',
  onChange,
}: {
  label: string;
  name: keyof PricingInputs;
  value: number;
  type?: string;
  unit?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className='flex items-start justify-between'>
    <div className='flex items-center'>
      <label htmlFor={String(name)} className='text-text font-medium'>
        {label}
      </label>
      {unit && (
        <span className='mt-1.5 pr-2 text-xs text-gray-400'>{unit}</span>
      )}
    </div>

    <Input
      id={String(name)}
      name={String(name)}
      type={type}
      min={0}
      value={value}
      onChange={onChange}
      className='w-24 text-center'
    />
  </div>
);

// The CheckboxField keeps the same external API but uses shadcn Checkbox internally.
// To avoid changing your existing handlers, we synthesize a minimal event object.
const CheckboxField = ({
  label,
  name,
  checked,
  onChange,
}: {
  label: string;
  name: keyof PricingInputs;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className='flex items-center space-x-2'>
      <label htmlFor={String(name)} className='text-text font-medium'>
        {label}
      </label>

      <Checkbox
        id={String(name)}
        checked={checked}
        className=''
        onCheckedChange={(val) => {
          // synthesize a simple event that your handler expects
          const synthetic = {
            target: { name: String(name), checked: !!val },
          } as unknown as React.ChangeEvent<HTMLInputElement>;
          onChange(synthetic);
        }}
      />
    </div>
  );
};

// --- MAIN COMPONENT (structure & logic untouched; only primitives swapped) ---
export default function PriceCalculator() {
  const [inputs, setInputs] = useState<PricingInputs>({
    clients: 1,
    servers: 0,
    voip_count: 0,
    monthly_visits: 1,
    out_of_city_visits: 0,
    emergency: 0,
    cctv_count: 0,
    antivirus_av: false,
    printers_scanners_count: 0,
    branches: 1,
    mikrotik_units: 0,
    vms: 0,
  });
  const [leadForm, setLeadForm] = useState<LeadFormState>({
    name: '',
    phone: '',
    email: '',
  });
  const [formStatus, setFormStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [formMessage, setFormMessage] = useState<string>('');
  const [isCommitted, setIsCommitted] = useState(false);

  const totalCost = useMemo(() => calculateTotalCost(inputs), [inputs]);
  const totalCostToman = totalCost;
  const totalCostRial = totalCost * 10;
  const discountedCostToman = Math.round(totalCostToman * 0.8);

  const finalDisplayedCost = isCommitted ? discountedCostToman : totalCostToman;

  // Handlers (unchanged externally)
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: parseInt(e.target.value) || 0,
    }));
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };
  const handleLeadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLeadForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const formatQuoteInputs = (): string => {
    return Object.entries(inputs)
      .map(([key, value]) => {
        const displayKey =
          (
            {
              clients: 'کلاینت',
              servers: 'سرور',
              voip_count: 'VoIP',
              monthly_visits: 'بازدید ماهانه',
              out_of_city_visits: 'بازدید خارج شهر',
              emergency: 'اضطراری',
              cctv_count: 'دوربین',
              antivirus_av: 'آنتی‌ویروس',
              printers_scanners_count: 'پرینتر',
              branches: 'شعب',
              mikrotik_units: 'میکروتیک/AP',
              vms: 'VMs',
            } as Record<string, string>
          )[key] || key;
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

    // placeholder result (keeps original behavior)
    const result = {
      success: true,
      message: 'درخواست شما ثبت شد. به زودی با شما تماس خواهیم گرفت.',
    };

    if (result.success) {
      setFormStatus('success');
      setFormMessage(`${result.message}\n\n${quoteInputs}`);
      setLeadForm({ name: '', phone: '', email: '' });
    } else {
      setFormStatus('error');
      setFormMessage(result.message || 'خطا در ارسال درخواست.');
    }
  };

  return (
    <div className='mx-12 rounded-2xl pb-8'>
      <DotPattern width={10} height={10} className='rounded-2xl' />
      <h2 className='text-foreground p-6 text-center text-3xl font-extrabold'>
        ماشین حساب آنلاین هزینه پشتیبانی
      </h2>

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
        {/* --- 1. Inputs Section --- */}
        <div className='border-primary bg-card relative space-y-6 rounded-md border p-4 lg:col-span-2'>
          <h3 className='text-primary border-primary mb-2 border-b pb-2 text-xl font-bold'>
            ورودی‌های تجهیزات و سرویس‌ها
          </h3>
          <div className='space-y-3'>
            <InputField
              label='تعداد کاربران/کلاینت‌ها'
              name='clients'
              value={inputs.clients}
              onChange={handleNumberChange}
            />
            <InputField
              label='تعداد سرورهای فیزیکی'
              name='servers'
              value={inputs.servers}
              onChange={handleNumberChange}
            />
            <InputField
              label='تعداد ماشین‌های مجازی (VMs)'
              name='vms'
              value={inputs.vms}
              unit='[۵ عدد اول رایگان]'
              onChange={handleNumberChange}
            />
            <InputField
              label='تعداد شعب/دفاتر جداگانه'
              name='branches'
              value={inputs.branches}
              unit='[۱ یا ۲ عدد رایگان]'
              onChange={handleNumberChange}
            />
          </div>
          <h3 className='text-primary border-primary mt-6 mb-2 border-b pb-2 text-xl font-bold'>
            تجهیزات جانبی و شبکه‌ای
          </h3>
          <div className='space-y-3'>
            <InputField
              label='تعداد دستگاه‌های میکروتیک/AP'
              name='mikrotik_units'
              value={inputs.mikrotik_units}
              unit='[۴ عدد رایگان]'
              onChange={handleNumberChange}
            />
            <InputField
              label='تعداد کاربران VoIP'
              name='voip_count'
              value={inputs.voip_count}
              unit='[۱۶ عدد اول ۱م تومان]'
              onChange={handleNumberChange}
            />
            <InputField
              label='تعداد پرینتر/اسکنر'
              name='printers_scanners_count'
              value={inputs.printers_scanners_count}
              unit='[۵ عدد اول رایگان]'
              onChange={handleNumberChange}
            />
            <InputField
              label='تعداد دوربین‌های مدار بسته'
              name='cctv_count'
              value={inputs.cctv_count}
              unit='[۱۶ عدد اول ۱م تومان]'
              onChange={handleNumberChange}
            />
            <CheckboxField
              label='پوشش آنتی‌ویروس مرکزی'
              name='antivirus_av'
              checked={inputs.antivirus_av}
              onChange={handleCheckboxChange}
            />
          </div>
          <h3 className='text-primary border-primary mt-6 mb-2 border-b pb-2 text-xl font-bold'>
            الزامات پاسخگویی و پشتیبانی
          </h3>
          <div className='space-y-3'>
            <InputField
              label='تعداد بازدید در محل (ماهانه)'
              name='monthly_visits'
              value={inputs.monthly_visits}
              unit='[۲ یا ۱ عدد رایگان]'
              onChange={handleNumberChange}
            />
            <InputField
              label='تعداد بازدید خارج از شهر'
              name='out_of_city_visits'
              value={inputs.out_of_city_visits}
              onChange={handleNumberChange}
            />
            <InputField
              label='تعداد دفعات نیاز به سرویس اضطراری (24/7)'
              name='emergency'
              value={inputs.emergency}
              onChange={handleNumberChange}
            />
          </div>
        </div>

        {/* --- 2. Result Section (Final Price Display & Lead Form) --- */}
        <div className='text-text flex flex-col justify-between rounded-md p-6 lg:col-span-1'>
          <div>
            <h3 className='text-foreground mb-3 text-center text-2xl font-semibold'>
              هزینه محاسبه شده (ماهانه)
            </h3>

            {/* 🎯 Price Display 🎯 */}
            <div className='text-center'>
              {isCommitted && (
                <p className='text-xl font-bold text-gray-400 line-through'>
                  {formatToToman(totalCostToman)} تومان
                </p>
              )}
              <p className='text-text text-6xl font-extrabold tracking-wider'>
                {formatToToman(finalDisplayedCost)}
              </p>
              <p className='text-foreground mt-2 text-lg font-light'>
                تومان در ماه
              </p>
              <p className='mt-1 text-sm font-light text-gray-400'>
                ({formatToToman(totalCostRial)} ریال)
              </p>
            </div>

            {/* 🎯 The Commitment Checkbox 🎯 */}
            <div className='bg-background border-primary relative mt-6 rounded-md border p-4'>
              <label className='flex cursor-pointer items-center gap-5'>
                <Checkbox
                  id='isCommitted'
                  checked={isCommitted}
                  onCheckedChange={(v) => setIsCommitted(!!v)}
                />
                <span className='text-foreground'>
                  تعهد ۲۴ ماهه برای دریافت ۲۰٪ تخفیف
                </span>
              </label>
              {isCommitted && (
                <p className='mt-2 text-xs text-gray-400'>
                  *قیمت بالا شامل ۲۰٪ تخفیف سال اول است.
                </p>
              )}
            </div>
          </div>

          {/* --- Lead Generation Form --- */}
          <form
            onSubmit={handleQuoteSubmit}
            className='border-background relative mt-6 space-y-3 border-t pt-6'
          >
            <h4 className='text-text pb-2 text-lg font-semibold'>
              درخواست تماس و پیش فاکتور
            </h4>
            <Input
              type='text'
              name='name'
              placeholder='نام و نام خانوادگی / شرکت'
              required
              value={leadForm.name}
              onChange={handleLeadChange}
              className='bg-background text-text border-primary focus:ring-accent focus:border-accent w-full rounded-md border p-2'
            />
            <Input
              type='tel'
              name='phone'
              placeholder='شماره تماس (ضروری)'
              required
              dir='rtl'
              value={leadForm.phone}
              onChange={handleLeadChange}
              className='bg-background text-text border-primary focus:ring-accent focus:border-accent w-full rounded-md border p-2'
            />
            <Input
              type='email'
              name='email'
              placeholder='ایمیل (اختیاری)'
              value={leadForm.email}
              onChange={handleLeadChange}
              className='bg-background text-text border-primary focus:ring-accent focus:border-accent w-full rounded-md border p-2'
            />

            <Button
              type='submit'
              disabled={formStatus === 'loading'}
              className={`hover:bg-secondary disabled:bg-muted bg-accent w-full rounded-md py-3 font-bold shadow-lg transition-colors ${formStatus === 'loading' ? 'bg-gray-400' : 'hover:bg-secondary disabled:bg-muted bg-accent text-background w-full rounded-md py-3 font-bold shadow-lg transition-colors'}`}
            >
              {formStatus === 'loading'
                ? 'در حال ارسال...'
                : 'ارسال درخواست پیش فاکتور'}
            </Button>

            {formMessage && (
              <p
                className={`text-center text-sm font-semibold ${formStatus === 'success' ? 'text-green-300' : 'text-red-400'}`}
              >
                {formMessage}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* --- Pricing Logic Table --- */}
      <div className='lg:col-span-3'>
        <PricingLogicTable />
      </div>
    </div>
  );
}
