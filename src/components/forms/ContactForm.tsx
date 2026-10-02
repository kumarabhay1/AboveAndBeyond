"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { siteConfig } from "@/data/site";
import { vehicleCategories, servicesData } from "@/data/services";
import { serviceCities } from "@/data/serviceAreas";
import { addOnServices } from "@/data/pricing";
import { CustomCalendar } from "@/components/ui/custom-calendar";
import { 
  Car, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  User, 
  Mail, 
  MessageSquare, 
  ShieldCheck,
  Send,
  X,
  Calendar as CalendarIcon,
  Check,
  Info,
  Smartphone
} from "lucide-react";

interface ContactFormProps {
  initialServiceId?: string;
}

function ContactFormInner({ initialServiceId }: ContactFormProps) {
  const searchParams = useSearchParams();

  // Find initial service from query param or prop
  const getInitialService = () => {
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      const match = servicesData.find(s => s.id === serviceParam || s.slug === serviceParam);
      if (match) return match.id;
    }
    if (initialServiceId) {
      const match = servicesData.find(s => s.id === initialServiceId || s.slug === initialServiceId);
      if (match) return match.id;
    }
    return servicesData[0].id;
  };

  // Find initial vehicle from query param
  const getInitialVehicle = () => {
    const vehicleParam = searchParams.get("vehicle");
    if (vehicleParam) {
      const match = vehicleCategories.find(v => v.id === vehicleParam);
      if (match) return match.id;
    }
    return vehicleCategories[0].id;
  };

  // Find initial area from query param
  const getInitialAddress = () => {
    const areaParam = searchParams.get("area");
    if (areaParam) {
      const match = serviceCities.find(c => c.id === areaParam || c.name.toLowerCase() === areaParam.toLowerCase());
      if (match) return `${match.name}, CA`;
    }
    return "";
  };

  // Step 1: Vehicle Category
  const [selectedVehicle, setSelectedVehicle] = useState(getInitialVehicle);

  // Step 2: Service Package
  const [selectedService, setSelectedService] = useState(getInitialService);

  // Step 3: Selected Addons
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Step 4: Date & Time
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("09:00 AM");

  // Step 5: Notification Preference
  const [notificationMethod, setNotificationMethod] = useState<"whatsapp" | "sms">("sms");

  // Step 6: Customer Details
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: getInitialAddress(),
    notes: "",
  });

  // Sync if searchParams change dynamically
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      const match = servicesData.find(s => s.id === serviceParam || s.slug === serviceParam);
      if (match) setSelectedService(match.id);
    }
    const vehicleParam = searchParams.get("vehicle");
    if (vehicleParam) {
      const match = vehicleCategories.find(v => v.id === vehicleParam);
      if (match) setSelectedVehicle(match.id);
    }
    const areaParam = searchParams.get("area");
    if (areaParam) {
      const match = serviceCities.find(c => c.id === areaParam || c.name.toLowerCase() === areaParam.toLowerCase());
      if (match) {
        setFormData(prev => ({
          ...prev,
          address: prev.address ? prev.address : `${match.name}, CA`
        }));
      }
    }
  }, [searchParams]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Expanded time slots matching 7:00 AM to 8:00 PM (7 Days a Week)
  const availableTimeSlots = [
    "07:00 AM",
    "08:30 AM",
    "10:30 AM",
    "12:30 PM",
    "02:30 PM",
    "04:30 PM",
    "06:30 PM"
  ];

  const currentVehicleObj = vehicleCategories.find(v => v.id === selectedVehicle) || vehicleCategories[0];
  const currentServiceObj = servicesData.find(s => s.id === selectedService) || servicesData[0];
  
  // Base starting price + selected add-ons
  const basePrice = currentServiceObj.startingPrice;

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = addOnServices.find(a => a.id === id);
    return sum + (addon ? addon.priceNum : 0);
  }, 0);

  const totalEstimatedPrice = basePrice + addonsTotal;

  const toggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatSummaryMessage = () => {
    const addonsList = selectedAddons.length > 0
      ? selectedAddons.map(id => addOnServices.find(a => a.id === id)?.name).filter(Boolean).join(", ")
      : "None";

    return `🔥 *NEW BOOKING REQUEST - ABOVE & BEYOND CAR DETAILING* 🔥
----------------------------------------
👤 *Customer Name:* ${formData.name || "N/A"}
📞 *Phone Number:* ${formData.phone || "N/A"}
✉️ *Email Address:* ${formData.email || "N/A"}
📍 *Service Location/City:* ${formData.address || "N/A"}
🔔 *Preferred Notification:* ${notificationMethod === "whatsapp" ? "WhatsApp" : "SMS Text"}

🚗 *Vehicle Type:* ${currentVehicleObj.name}
✨ *Requested Package:* ${currentServiceObj.title}
🛠️ *Selected Add-ons:* ${addonsList}
💰 *Estimated Total:* $${totalEstimatedPrice} (Varies on condition)

📅 *Requested Date:* ${selectedDate || "Flexible"}
⏰ *Requested Arrival Window:* ${selectedTimeSlot}
📝 *Notes / Special Requests:* ${formData.notes || "None"}
----------------------------------------
*Note:* Time slot is requested. Harbaz Hundal will contact you to confirm final arrival.`;
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = formatSummaryMessage();
    const whatsappUrl = siteConfig.getWhatsAppUrl(msg);
    window.open(whatsappUrl, "_blank");
    setIsSubmitted(true);
  };

  const handleStandardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="w-full relative">
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl glass-card relative overflow-hidden">
        
        {/* Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ff5500] via-[#ff7700] to-[#ff5500]" />

        {/* Wizard Form Header */}
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/25 mb-3">
            <ShieldCheck className="w-4 h-4 text-[#ff5500]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff5500]">
              Mobile Booking & Quote Request
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground uppercase tracking-tight">
            Reserve Your <span className="text-[#ff5500]">Detailing Appointment</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            We bring professional mobile car detailing right to your home, workplace, or preferred location across Southern California.
          </p>

          {/* Time Slot Request Disclaimer Banner */}
          <div className="mt-4 p-3.5 rounded-2xl bg-[#ff5500]/10 border border-[#ff5500]/25 flex items-start space-x-3 text-xs text-foreground/85">
            <Info className="w-4 h-4 text-[#ff5500] shrink-0 mt-0.5" />
            <span>
              <strong className="text-foreground">Scheduling Note:</strong> The appointment date and time you select is a requested window. Owner <strong className="text-[#ff5500]">Harbaz Hundal</strong> or our dispatch team will contact you to confirm availability or provide an updated slot.
            </span>
          </div>
        </div>

        <form onSubmit={handleStandardSubmit} className="space-y-10">
          
          {/* STEP 1: VEHICLE TYPE SELECTOR */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
              <Car className="w-4 h-4 text-[#ff5500]" /> 1. Select Vehicle Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {vehicleCategories.map((cat) => {
                const active = selectedVehicle === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedVehicle(cat.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      active
                        ? "bg-[#ff5500]/15 border-[#ff5500] text-foreground shadow-lg shadow-[#ff5500]/20 scale-[1.02]"
                        : "bg-secondary/50 border-border text-foreground/80 hover:border-primary/40 hover:bg-secondary"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[#ff5500]">
                        {active ? <CheckCircle2 className="w-5 h-5 fill-[#ff5500] text-white" /> : <Car className="w-5 h-5 text-muted-foreground" />}
                      </span>
                    </div>
                    <div>
                      <div className="font-outfit font-bold text-sm text-foreground">{cat.name}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{cat.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: SERVICE PACKAGE CHOICE CARDS */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#ff5500]" /> 2. Select Main Detailing Package
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {servicesData.map((service) => {
                const active = selectedService === service.id;
                return (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                      active
                        ? "bg-[#ff5500]/10 border-[#ff5500] text-foreground ring-1 ring-[#ff5500]"
                        : "bg-secondary/40 border-border text-foreground hover:border-primary/40 hover:bg-secondary/70"
                    }`}
                  >
                    {service.badge && (
                      <span className="absolute top-3 right-3 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#ff5500] text-white shadow-sm">
                        {service.badge}
                      </span>
                    )}

                    <div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${active ? "border-[#ff5500] bg-[#ff5500]" : "border-muted-foreground"}`}>
                          {active && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <h4 className="font-outfit font-bold text-base text-foreground">{service.title}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 pl-6 leading-relaxed">{service.tagline}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                      <div className="flex items-center text-xs text-muted-foreground space-x-1">
                        <Clock className="w-3.5 h-3.5 text-[#ff5500]" />
                        <span>{service.duration}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-muted-foreground">Starts: </span>
                        <span className="text-xl font-display font-extrabold text-[#ff5500]">${service.startingPrice}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 3: ADD-ON SERVICES */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#ff5500]" /> 3. Select Add-on Enhancements (Optional)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {addOnServices.map((addon) => {
                const active = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                      active
                        ? "bg-[#ff5500]/20 border-[#ff5500] text-foreground"
                        : "bg-secondary/40 border-border text-foreground hover:bg-secondary"
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${active ? "border-[#ff5500] bg-[#ff5500]" : "border-muted-foreground"}`}>
                        {active && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-foreground">{addon.name}</div>
                        <div className="text-[10px] text-muted-foreground">{addon.duration}</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#ff5500]">{addon.price}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 4: DATE & TIME SLOT PICKER */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-[#ff5500]" /> 4. Select Preferred Date & Arrival Window (7 AM - 8 PM, 7 Days a Week)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-7">
                <CustomCalendar
                  selectedDate={selectedDate}
                  onSelectDate={(date) => setSelectedDate(date)}
                />
              </div>
              <div className="md:col-span-5 bg-secondary/40 border border-border rounded-2xl p-4 sm:p-5">
                <h4 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#ff5500]" /> Arrival Window Request
                </h4>
                <p className="text-[11px] text-muted-foreground mb-3">
                  Select your ideal arrival time. We will confirm based on our daily route.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {availableTimeSlots.map((slot) => {
                    const active = selectedTimeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                          active
                            ? "bg-[#ff5500] text-white shadow-md shadow-[#ff5500]/30"
                            : "bg-card text-foreground border border-border hover:bg-muted"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
                {selectedDate && (
                  <div className="mt-4 p-3 rounded-xl bg-[#ff5500]/10 border border-[#ff5500]/20 text-xs text-foreground/90">
                    Requested Slot: <span className="font-bold text-[#ff5500]">{selectedDate}</span> at <span className="font-bold text-[#ff5500]">{selectedTimeSlot}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* STEP 5: PREFERRED NOTIFICATION METHOD & CONTACT INFO */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-[#ff5500]" /> 5. Contact Details & Preferred Confirmation Method
            </label>

            {/* Notification Preference Selector */}
            <div className="mb-5 p-4 rounded-2xl bg-secondary/30 border border-border">
              <div className="text-xs font-bold uppercase text-foreground mb-2">
                How would you like to receive your booking confirmation & updates?
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setNotificationMethod("sms")}
                  className={`p-3 rounded-xl border flex items-center space-x-3 text-left transition-all cursor-pointer ${
                    notificationMethod === "sms"
                      ? "bg-[#ff5500]/20 border-[#ff5500] text-foreground"
                      : "bg-card border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Smartphone className={`w-5 h-5 ${notificationMethod === "sms" ? "text-[#ff5500]" : "text-muted-foreground"}`} />
                  <div>
                    <div className="text-xs font-bold text-foreground">SMS Text Message & Phone Call</div>
                    <div className="text-[10px] text-muted-foreground">Direct mobile text & call (Standard for US)</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setNotificationMethod("whatsapp")}
                  className={`p-3 rounded-xl border flex items-center space-x-3 text-left transition-all cursor-pointer ${
                    notificationMethod === "whatsapp"
                      ? "bg-emerald-500/20 border-emerald-500 text-foreground"
                      : "bg-card border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <MessageSquare className={`w-5 h-5 ${notificationMethod === "whatsapp" ? "text-emerald-500" : "text-muted-foreground"}`} />
                  <div>
                    <div className="text-xs font-bold text-foreground">WhatsApp Message</div>
                    <div className="text-[10px] text-muted-foreground">Direct chat via WhatsApp</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Smith"
                    className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Phone Number (For Text/Call Confirmation) *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-muted-foreground" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (951) 000-0000"
                    className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-muted-foreground" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Service Address / City (Where We Detail) *</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="e.g. Riverside, CA / Moreno Valley"
                    className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500]"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Vehicle Make, Model & Special Requests (Optional)</label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 absolute left-3.5 top-3.5 text-muted-foreground" />
                <textarea
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="e.g. 2023 Tesla Model Y, heavy dog hair in backseat, scratch on rear bumper..."
                  className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500]"
                />
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS & ESTIMATE */}
          <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <div className="text-xs text-muted-foreground">Total Estimated Price:</div>
              <div className="text-3xl font-display font-extrabold text-[#ff5500]">
                ${totalEstimatedPrice}
                <span className="text-xs font-normal text-muted-foreground ml-1.5">(Starting estimate. Price differs according to size & condition)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleWhatsAppSubmit}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-emerald-900/30 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit via WhatsApp</span>
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#ff7700] hover:from-[#e64a19] hover:to-[#ff5500] text-white font-extrabold text-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-xl shadow-[#ff5500]/30 cursor-pointer"
              >
                <span>Submit Appointment Request</span>
              </button>
            </div>
          </div>

        </form>

        {/* WEB CONFIRMATION MODAL */}
        {isSubmitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-card border border-[#ff5500]/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative text-center">
              <button
                onClick={() => setIsSubmitted(false)}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground rounded-full bg-secondary cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 bg-[#ff5500]/20 rounded-full border-2 border-[#ff5500] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-[#ff5500]" />
              </div>

              <h3 className="text-2xl font-display font-bold text-foreground uppercase">
                Appointment Request Received!
              </h3>
              <p className="text-muted-foreground text-sm mt-2">
                Thank you, <span className="text-[#ff5500] font-bold">{formData.name || "Valued Customer"}</span>! Owner <strong className="text-foreground">Harbaz Hundal</strong> or the Above & Beyond team will contact you via <strong className="text-[#ff5500]">{notificationMethod === "whatsapp" ? "WhatsApp" : "SMS Text / Phone"}</strong> to confirm your arrival window.
              </p>

              <div className="mt-6 p-4 rounded-2xl bg-secondary/50 border border-border text-left text-xs space-y-1.5 text-muted-foreground">
                <div><strong className="text-foreground">Package:</strong> {currentServiceObj.title}</div>
                <div><strong className="text-foreground">Vehicle:</strong> {currentVehicleObj.name}</div>
                <div><strong className="text-foreground">Requested Window:</strong> {selectedDate || "Flexible"} ({selectedTimeSlot})</div>
                <div><strong className="text-foreground">Estimated Total:</strong> ${totalEstimatedPrice}</div>
              </div>

              <div className="mt-6 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    const msg = formatSummaryMessage();
                    window.open(siteConfig.getWhatsAppUrl(msg), "_blank");
                  }}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Direct WhatsApp Copy</span>
                </button>
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="w-full py-2.5 rounded-xl bg-secondary hover:bg-muted text-foreground font-semibold text-xs flex items-center justify-center space-x-1.5 cursor-pointer border border-border"
                >
                  <Phone className="w-3.5 h-3.5 text-[#ff5500]" />
                  <span>Call Harbaz Directly: {siteConfig.phone}</span>
                </a>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full py-2 text-muted-foreground hover:text-foreground font-semibold text-xs cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function ContactFormSkeleton() {
  return (
    <div className="w-full relative">
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl glass-card relative overflow-hidden animate-pulse">
        <div className="h-6 w-48 bg-muted rounded-full mb-4" />
        <div className="h-10 w-3/4 bg-muted rounded-xl mb-3" />
        <div className="h-4 w-1/2 bg-muted/60 rounded-lg mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-muted/60 rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-36 bg-muted/60 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ContactForm(props: ContactFormProps) {
  return (
    <Suspense fallback={<ContactFormSkeleton />}>
      <ContactFormInner {...props} />
    </Suspense>
  );
}

