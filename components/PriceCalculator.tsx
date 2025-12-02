'use client';

import React, { useState, useMemo } from 'react';
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

// --- Interfaces ---
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
  apply_discount: boolean;
}

interface LeadFormState {
  name: string;
  phone: string;
  email: string;
}

// --- Constants (Costs in Tomans) ---
const BASE_COST_TOMANS: number[] = [
  5000000, 8000000, 12000000, 18000000, 25000000,
];
const CLIENT_TIERS: number[] = [10, 20, 40, 60, 80];

const COSTS = {
  SERVER: 2000000,
  VOIP: 150000,
  VISIT: 1500000,
  OUT_CITY: 2500000,
  EMERGENCY: 2000000,
  CCTV: 100000,
  PRINTER: 150000,
  BRANCH: 1000000,
  MIKROTIK: 500000,
  VM: 300000,
  ANTIVIRUS: 1000000,
};

export default function PriceCalculator() {
  const [inputs, setInputs] = useState<PricingInputs>({
    clients: 10,
    servers: 0,
    voip_count: 0,
    monthly_visits: 2,
    out_of_city_visits: 0,
    emergency: 0,
    cctv_count: 0,
    antivirus_av: false,
    printers_scanners_count: 0,
    branches: 1,
    mikrotik_units: 0,
    vms: 0,
    apply_discount: false,
  });

  const [leadForm, setLeadForm] = useState<LeadFormState>({
    name: '',
    phone: '',
    email: '',
  });

  const [formStatus, setFormStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [formMessage, setFormMessage] = useState('');

  // --- Calculation Logic ---
  const { totalBeforeDiscount, finalPrice, discountAmount } = useMemo(() => {
    // 1. Determine Base Tier
    let tierIndex = 0;
    for (let i = 0; i < CLIENT_TIERS.length; i++) {
      if (inputs.clients <= CLIENT_TIERS[i]) {
        tierIndex = i;
        break;
      }
      if (i === CLIENT_TIERS.length - 1) tierIndex = i;
    }
    const base = BASE_COST_TOMANS[tierIndex];

    // 2. Add-ons
    const addons =
      inputs.servers * COSTS.SERVER +
      inputs.voip_count * COSTS.VOIP +
      inputs.monthly_visits * COSTS.VISIT +
      inputs.out_of_city_visits * COSTS.OUT_CITY +
      inputs.emergency * COSTS.EMERGENCY +
      inputs.cctv_count * COSTS.CCTV +
      inputs.printers_scanners_count * COSTS.PRINTER +
      Math.max(0, inputs.branches - 1) * COSTS.BRANCH +
      inputs.mikrotik_units * COSTS.MIKROTIK +
      inputs.vms * COSTS.VM +
      (inputs.antivirus_av ? COSTS.ANTIVIRUS : 0);

    const subTotal = base + addons;

    // 3. Discount (10%)
    const discount = inputs.apply_discount ? subTotal * 0.1 : 0;

    return {
      totalBeforeDiscount: subTotal,
      discountAmount: discount,
      finalPrice: subTotal - discount,
    };
  }, [inputs]);

  const handleChange = (field: keyof PricingInputs, val: number | boolean) => {
    setInputs((prev) => ({ ...prev, [field]: val }));
  };

  const handleLeadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLeadForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) {
      setFormStatus('error');
      setFormMessage('لطفا نام و شماره تماس را وارد کنید');
      return;
    }

    setFormStatus('loading');
    setFormMessage('');

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead: leadForm,
          inputs,
          estimatedPrice: finalPrice,
        }),
      });

      if (!response.ok) throw new Error('Failed to send');
      setFormStatus('success');
      setFormMessage(
        'درخواست شما ارسال شد. کارشناسان ما به زودی تماس می‌گیرند.'
      );
      setLeadForm({ name: '', phone: '', email: '' });
    } catch (err) {
      console.error(err);
      setFormStatus('error');
      setFormMessage('خطا در ارسال. لطفا با پشتیبانی تماس بگیرید.');
    } finally {
      setTimeout(() => {
        setFormStatus('idle');
        setFormMessage('');
      }, 5000);
    }
  };

  return (
    <div className='flex flex-col gap-8'>
      <DotPattern width={20} height={20} className='rounded-2xl' />

      <div className='relative grid grid-cols-1 gap-8 lg:grid-cols-5'>
        {/* --- INPUTS --- */}
        <div className='bg-card/50 z-10 space-y-6 rounded-xl border p-6 backdrop-blur-sm lg:col-span-2'>
          <h3 className='text-accent mb-4 text-xl font-bold'>مشخصات شبکه</h3>

          {/* Core Inputs */}
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label>تعداد کلاینت (کاربران شبکه)</Label>
              <Input
                type='number'
                min={0}
                value={inputs.clients}
                onChange={(e) =>
                  handleChange('clients', Number(e.target.value))
                }
                className='bg-background/50 border-white/10'
              />
            </div>
            <div className='grid gap-2'>
              <Label>تعداد سرور فیزیکی</Label>
              <Input
                type='number'
                min={0}
                value={inputs.servers}
                onChange={(e) =>
                  handleChange('servers', Number(e.target.value))
                }
                className='bg-background/50 border-white/10'
              />
            </div>
          </div>

          {/* Detailed Inputs Group */}
          <div className='grid grid-cols-2 gap-4 text-xs'>
            {[
              { label: 'ماشین مجازی (VM)', key: 'vms' },
              { label: 'بازدید ماهانه', key: 'monthly_visits' },
              { label: 'بازدید خارج شهر', key: 'out_of_city_visits' },
              { label: 'پرینتر/اسکنر', key: 'printers_scanners_count' },
              { label: 'دوربین (CCTV)', key: 'cctv_count' },
              { label: 'میکروتیک/روتر', key: 'mikrotik_units' },
              { label: 'تلفن VoIP', key: 'voip_count' },
              { label: 'تعداد شعب', key: 'branches', min: 1 },
              { label: 'اعزام اضطراری', key: 'emergency' },
            ].map((field) => (
              <div key={field.key} className='grid gap-1'>
                <Label className='text-foreground/70 text-xs'>
                  {field.label}
                </Label>
                <Input
                  type='number'
                  min={field.min || 0}
                  value={(inputs as any)[field.key]}
                  onChange={(e) =>
                    handleChange(
                      field.key as keyof PricingInputs,
                      Number(e.target.value)
                    )
                  }
                  className='bg-background/50 h-8 border-white/10'
                />
              </div>
            ))}
          </div>

          {/* Checkboxes */}
          <div className='space-y-4 pt-4'>
            <div className='flex items-center gap-2'>
              <Checkbox
                id='av'
                checked={inputs.antivirus_av}
                onCheckedChange={(c) => handleChange('antivirus_av', !!c)}
                className='data-[state=checked]:bg-accent border-white/20'
              />
              <Label htmlFor='av' className='cursor-pointer text-sm'>
                مدیریت آنتی‌ویروس تحت شبکه
              </Label>
            </div>

            {/* DISCOUNT CHECKBOX - Aligned perfectly */}
            <div className='flex items-center gap-2'>
              <Checkbox
                id='discount'
                checked={inputs.apply_discount}
                onCheckedChange={(c) => handleChange('apply_discount', !!c)}
                className='border-accent data-[state=checked]:bg-accent'
              />
              <Label
                htmlFor='discount'
                className='text-accent cursor-pointer text-sm font-bold'
              >
                اعمال تخفیف ویژه قرارداد سالانه (۱۰٪)
              </Label>
            </div>
          </div>
        </div>

        {/* --- RESULTS --- */}
        <div className='z-10 flex flex-col space-y-6 lg:col-span-3'>
          {/* Price Card */}
          <div className='border-accent/20 bg-accent/5 flex flex-col items-center justify-center rounded-xl border py-10 text-center backdrop-blur-sm'>
            <h2 className='text-foreground/80 text-2xl font-light'>
              برآورد هزینه ماهانه
            </h2>

            {inputs.apply_discount && (
              <div className='text-foreground/40 mt-2 text-lg line-through decoration-red-500'>
                {totalBeforeDiscount.toLocaleString()}
              </div>
            )}

            <div className='text-accent my-2 text-5xl font-bold tracking-tight md:text-6xl'>
              {finalPrice.toLocaleString()}
              <span className='text-foreground/50 mr-2 text-2xl font-light'>
                تومان
              </span>
            </div>

            {inputs.apply_discount && (
              <div className='mb-2 text-sm font-medium text-green-400'>
                شما مبلغ {discountAmount.toLocaleString()} تومان سود کردید!
              </div>
            )}

            <p className='text-foreground/50 max-w-md px-6 text-sm'>
              * مبلغ نهایی پس از بازدید حضوری و نیازسنجی دقیق قطعی خواهد شد.
            </p>
          </div>

          {/* Lead Form */}
          <div className='bg-card/50 rounded-xl border p-6 backdrop-blur-sm'>
            <h3 className='text-foreground mb-4 text-lg font-bold'>
              دریافت پیش‌فاکتور رسمی
            </h3>
            <form onSubmit={handleLeadSubmit} className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <Input
                  name='name'
                  placeholder='نام / نام شرکت'
                  value={leadForm.name}
                  onChange={handleLeadChange}
                  className='bg-background border-primary/20'
                />
                <Input
                  name='phone'
                  placeholder='شماره تماس'
                  value={leadForm.phone}
                  onChange={handleLeadChange}
                  className='bg-background border-primary/20'
                />
              </div>
              <Input
                name='email'
                placeholder='ایمیل (اختیاری)'
                value={leadForm.email}
                onChange={handleLeadChange}
                className='bg-background border-primary/20'
              />
              <Button
                type='submit'
                disabled={formStatus === 'loading'}
                className='bg-accent hover:bg-accent/80 text-background w-full font-bold'
              >
                {formStatus === 'loading' ? 'در حال ارسال...' : 'ارسال درخواست'}
              </Button>
              {formMessage && (
                <p
                  className={`text-center text-sm ${formStatus === 'success' ? 'text-green-400' : 'text-red-400'}`}
                >
                  {formMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* --- PRICING LOGIC TABLE (Full Width, No Prices) --- */}
      <div className='bg-card/30 w-full overflow-hidden rounded-xl border border-white/10 backdrop-blur-sm'>
        <div className='text-foreground/80 bg-white/5 p-4 font-bold'>
          شرح خدمات تحت پوشش
        </div>
        <Table>
          <TableHeader>
            <TableRow className='border-white/10 hover:bg-transparent'>
              <TableHead className='text-foreground/60 w-1/2 text-right'>
                عنوان خدمت
              </TableHead>
              <TableHead className='text-foreground/60 text-right'>
                توضیحات تکمیلی
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className='border-white/5 hover:bg-white/5'>
              <TableCell className='text-foreground/90 font-medium'>
                پشتیبانی کلاینت (Helpdesk)
              </TableCell>
              <TableCell className='text-foreground/70'>
                رفع مشکلات نرم‌افزاری، ویندوز، آفیس و پرینتر کاربران به صورت
                ریموت و حضوری
              </TableCell>
            </TableRow>
            <TableRow className='border-white/5 hover:bg-white/5'>
              <TableCell className='text-foreground/90 font-medium'>
                پشتیبانی سرور و اکتیو دایرکتوری
              </TableCell>
              <TableCell className='text-foreground/70'>
                مدیریت کاربران، دسترسی‌ها، فایل شیرینگ و بک‌آپ گیری منظم
              </TableCell>
            </TableRow>
            <TableRow className='border-white/5 hover:bg-white/5'>
              <TableCell className='text-foreground/90 font-medium'>
                بازدیدهای دوره‌ای (PM)
              </TableCell>
              <TableCell className='text-foreground/70'>
                چک‌لیست سلامت تجهیزات، به‌روزرسانی‌ها و سرویس فیزیکی رک‌ها
              </TableCell>
            </TableRow>
            <TableRow className='border-white/5 hover:bg-white/5'>
              <TableCell className='text-foreground/90 font-medium'>
                مدیریت امنیت شبکه
              </TableCell>
              <TableCell className='text-foreground/70'>
                کانفیگ فایروال، آنتی‌ویروس تحت شبکه و جلوگیری از باج‌افزار
              </TableCell>
            </TableRow>
            <TableRow className='border-white/5 hover:bg-white/5'>
              <TableCell className='text-foreground/90 font-medium'>
                پشتیبانی تجهیزات جانبی
              </TableCell>
              <TableCell className='text-foreground/70'>
                نظارت بر عملکرد دوربین‌های مداربسته، تلفن‌های VoIP و حضور و غیاب
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className='text-foreground/40 bg-white/5 p-4 text-xs'>
          * تمامی خدمات فوق در قراردادهای پشتیبانی لارا سافت لحاظ می‌گردد.
        </div>
      </div>
    </div>
  );
}
