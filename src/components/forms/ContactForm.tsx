"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  Smartphone,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Layers,
  ChevronRight,
  Plus,
} from "lucide-react";

interface ContactFormProps {
  initialServiceId?: string;
}

function ContactFormInner({ initialServiceId }: ContactFormProps) {
  const searchParams = useSearchParams();
  const formTopRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);

  // Wizard Step State (1: Vehicle & Service, 2: Add-ons, 3: Date & Time, 4: Contact Info)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Smooth scroll helper to keep user centered at the top of the booking wizard on step change
  const scrollToFormTop = () => {
    if (formTopRef.current && typeof window !== "undefined") {
      const navbarOffset = 110;
      const elementPosition = formTopRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    if (typeof window !== "undefined") {
      scrollToFormTop();
    }
  };

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    const timer = setTimeout(() => {
      scrollToFormTop();
    }, 40);
    return () => clearTimeout(timer);
  }, [currentStep]);

  // Find initial service from query param or prop
  const getInitialService = () => {
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      const match = servicesData.find(
        (s) => s.id === serviceParam || s.slug === serviceParam
      );
      if (match) return match.id;
    }
    if (initialServiceId) {
      const match = servicesData.find(
        (s) => s.id === initialServiceId || s.slug === initialServiceId
      );
      if (match) return match.id;
    }
    return servicesData[0].id;
  };

  // Find initial vehicle from query param
  const getInitialVehicle = () => {
    const vehicleParam = searchParams.get("vehicle");
    if (vehicleParam) {
      const match = vehicleCategories.find((v) => v.id === vehicleParam);
      if (match) return match.id;
    }
    return vehicleCategories[0].id;
  };

  // Find initial area from query param
  const getInitialAddress = () => {
    const areaParam = searchParams.get("area");
    if (areaParam) {
      const match = serviceCities.find(
        (c) =>
          c.id === areaParam ||
          c.name.toLowerCase() === areaParam.toLowerCase()
      );
      if (match) return `${match.name}, CA`;
    }
    return "";
  };

  // Multi-Vehicle Selection State
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>(() => [
    getInitialVehicle(),
  ]);

  // Multi-Service / Package Selection State
  const [selectedServices, setSelectedServices] = useState<string[]>(() => [
    getInitialService(),
  ]);

  // Add-ons, Date, Time & Contact Details State
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("09:00 AM");
  const [notificationMethod, setNotificationMethod] = useState<"whatsapp" | "sms">("sms");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: getInitialAddress(),
    notes: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync if searchParams change dynamically
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      const match = servicesData.find(
        (s) => s.id === serviceParam || s.slug === serviceParam
      );
      if (match && !selectedServices.includes(match.id)) {
        setSelectedServices([match.id]);
      }
    }
    const vehicleParam = searchParams.get("vehicle");
    if (vehicleParam) {
      const match = vehicleCategories.find((v) => v.id === vehicleParam);
      if (match && !selectedVehicles.includes(match.id)) {
        setSelectedVehicles([match.id]);
      }
    }
    const areaParam = searchParams.get("area");
    if (areaParam) {
      const match = serviceCities.find(
        (c) =>
          c.id === areaParam ||
          c.name.toLowerCase() === areaParam.toLowerCase()
      );
      if (match) {
        setFormData((prev) => ({
          ...prev,
          address: prev.address ? prev.address : `${match.name}, CA`,
        }));
      }
    }
  }, [searchParams]);

  // Operating time slots (7:00 AM to 8:00 PM, 7 Days a Week)
  const availableTimeSlots = [
    "07:00 AM",
    "08:30 AM",
    "10:00 AM",
    "11:30 AM",
    "01:00 PM",
    "02:30 PM",
    "04:00 PM",
    "05:30 PM",
    "07:00 PM",
  ];

  // Dynamic Price Calculation
  const servicesBaseSum = selectedServices.reduce((sum, sId) => {
    const serv = servicesData.find((s) => s.id === sId);
    return sum + (serv ? serv.startingPrice : 0);
  }, 0);

  // Multiply by vehicle count if multiple vehicles are detailed
  const totalBasePrice = servicesBaseSum * Math.max(selectedVehicles.length, 1);

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = addOnServices.find((a) => a.id === id);
    return sum + (addon ? addon.priceNum : 0);
  }, 0);

  const totalEstimatedPrice = totalBasePrice + addonsTotal;

  // Toggle Vehicle Selection
  const toggleVehicle = (vId: string) => {
    if (selectedVehicles.includes(vId)) {
      if (selectedVehicles.length > 1) {
        setSelectedVehicles(selectedVehicles.filter((id) => id !== vId));
      }
    } else {
      setSelectedVehicles([...selectedVehicles, vId]);
    }
  };

  // Toggle Package / Service Selection
  const toggleService = (sId: string) => {
    if (selectedServices.includes(sId)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((id) => id !== sId));
      }
    } else {
      setSelectedServices([...selectedServices, sId]);
    }
  };

  // Toggle Add-on
  const toggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateStep4 = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Please enter your full name";
    if (!formData.phone.trim()) errors.phone = "Please enter your phone number";
    if (!formData.email.trim()) errors.email = "Please enter your email address";
    if (!formData.address.trim()) {
      errors.address = "Please enter your exact street address & city";
    } else if (formData.address.trim().length < 5) {
      errors.address = "Please provide complete street address (House/Street #, City & Zip)";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const formatSummaryMessage = () => {
    const vehiclesList = selectedVehicles
      .map((id) => vehicleCategories.find((v) => v.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    const packagesList = selectedServices
      .map((id) => servicesData.find((s) => s.id === id)?.title)
      .filter(Boolean)
      .join(", ");

    const addonsList =
      selectedAddons.length > 0
        ? selectedAddons
            .map((id) => addOnServices.find((a) => a.id === id)?.name)
            .filter(Boolean)
            .join(", ")
        : "None";

    return `*NEW BOOKING REQUEST - ABOVE & BEYOND CAR DETAILING*
----------------------------------------
*Customer Name:* ${formData.name || "N/A"}
*Phone Number:* ${formData.phone || "N/A"}
*Email Address:* ${formData.email || "N/A"}
*Exact Service Address:* ${formData.address || "N/A"}
*Preferred Notification:* ${
      notificationMethod === "whatsapp" ? "WhatsApp" : "SMS Text / Phone"
    }

*Vehicle Type(s) (${selectedVehicles.length}):* ${vehiclesList}
*Requested Package(s) (${selectedServices.length}):* ${packagesList}
*Selected Add-on(s):* ${addonsList}
*Estimated Starting Base:* $${totalEstimatedPrice} (*Base estimate - differs by size & condition)

*Requested Date:* ${selectedDate || "Flexible"}
*Requested Arrival Window:* ${selectedTimeSlot}
*Notes / Special Requests:* ${formData.notes || "None"}
----------------------------------------
*Notice:* Arrival window is requested. Owner Harbaz Hundal will contact you directly to confirm final arrival time.`;
  };

  const handleStandardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep4()) return;
    setIsSubmitted(true);
  };

  const stepsConfig = [
    { num: 1, label: "Vehicles & Packages", icon: <Car className="w-4 h-4" /> },
    { num: 2, label: "Add-Ons", icon: <Sparkles className="w-4 h-4" /> },
    { num: 3, label: "Date & Time", icon: <CalendarIcon className="w-4 h-4" /> },
    { num: 4, label: "Confirm Details", icon: <User className="w-4 h-4" /> },
  ];

  return (
    <div ref={formTopRef} id="booking-form-wizard" className="w-full relative scroll-mt-32">
      <div className="bg-card border border-border rounded-3xl p-5 sm:p-7 md:p-9 shadow-2xl glass-card relative overflow-hidden">
        {/* Top Gradient Specular Strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ff5500] via-[#ff7733] to-[#ff5500]" />

        {/* Wizard Progress Stepper Header */}
        <div className="mb-8 pt-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/25 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ff5500]" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#ff5500]">
                  Mobile Detailing Reservation
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-foreground uppercase tracking-tight">
                Reserve Your <span className="text-gradient-orange">Appointment</span>
              </h2>
            </div>

            {/* Quick Pricing Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-secondary/70 border border-border shrink-0 self-start sm:self-auto">
              <div className="text-right">
                <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                  Starting Estimate ({selectedVehicles.length} vehicle{selectedVehicles.length > 1 ? "s" : ""})
                </div>
                <div className="text-xl font-display font-extrabold text-[#ff5500] leading-none">
                  ${totalEstimatedPrice}
                </div>
              </div>
            </div>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 pb-1">
            {stepsConfig.map((step) => {
              const isActive = currentStep === step.num;
              const isPassed = currentStep > step.num;
              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => goToStep(step.num)}
                  className={`flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#ff5500]/15 border-[#ff5500] text-foreground shadow-md shadow-[#ff5500]/15"
                      : isPassed
                      ? "bg-secondary/60 border-border text-foreground/90 hover:bg-secondary"
                      : "bg-secondary/20 border-border/60 text-muted-foreground hover:bg-secondary/40"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 ${
                      isActive
                        ? "bg-[#ff5500] text-white"
                        : isPassed
                        ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isPassed ? <Check className="w-3.5 h-3.5" /> : step.num}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground leading-none">
                      Step {step.num}
                    </div>
                    <div className="text-xs font-bold text-foreground truncate mt-0.5">
                      {step.label}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Content with Motion */}
        <AnimatePresence mode="wait">
          {/* ========================================================================= */}
          {/* STEP 1: MULTI-VEHICLE & MULTI-PACKAGE SELECTION */}
          {/* ========================================================================= */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* 1.1 Multi-Vehicle Selector */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                  <label className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-foreground flex items-center gap-2">
                    <Car className="w-4 h-4 text-[#ff5500]" /> 1. Select Vehicle Categories
                  </label>
                  <span className="text-[11px] text-[#ff5500] font-semibold">
                    ✓ Multi-Select Enabled ({selectedVehicles.length} selected)
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
                  {vehicleCategories.map((cat) => {
                    const active = selectedVehicles.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleVehicle(cat.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                          active
                            ? "bg-[#ff5500]/15 border-[#ff5500] text-foreground shadow-md shadow-[#ff5500]/20 scale-[1.02]"
                            : "bg-secondary/40 border-border text-foreground hover:border-[#ff5500]/40 hover:bg-secondary/80"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div
                            className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                              active
                                ? "bg-[#ff5500] text-white"
                                : "bg-secondary text-muted-foreground group-hover:text-foreground"
                            }`}
                          >
                            <Car className="w-4 h-4" />
                          </div>
                          {active && (
                            <CheckCircle2 className="w-4 h-4 text-[#ff5500] fill-[#ff5500]/20" />
                          )}
                        </div>
                        <div>
                          <div className="font-outfit font-bold text-xs sm:text-sm text-foreground flex items-center justify-between">
                            <span>{cat.name}</span>
                          </div>
                          <div className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
                            {cat.description}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 1.2 Multi-Service / Package Selector */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                  <label className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ff5500]" /> 2. Select Detailing Packages
                  </label>
                  <span className="text-[11px] text-[#ff5500] font-semibold">
                    ✓ Multi-Select Enabled ({selectedServices.length} selected)
                  </span>
                </div>

                {/* 2-Column Responsive Grid (Spacious & Clean) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {servicesData.map((service) => {
                    const active = selectedServices.includes(service.id);
                    return (
                      <div
                        key={service.id}
                        onClick={() => toggleService(service.id)}
                        className={`p-4 sm:p-5 rounded-3xl border transition-all duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between group ${
                          active
                            ? "bg-[#ff5500]/10 border-[#ff5500] ring-1 ring-[#ff5500] shadow-xl shadow-[#ff5500]/15"
                            : "bg-secondary/40 border-border hover:border-[#ff5500]/40 hover:bg-secondary/70 shadow-sm"
                        }`}
                      >
                        {/* Header with Title & Badge */}
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                                  active
                                    ? "border-[#ff5500] bg-[#ff5500] text-white"
                                    : "border-muted-foreground/50 bg-background"
                                }`}
                              >
                                {active && <Check className="w-3 h-3 text-white stroke-[3]" />}
                              </div>
                              <h3 className="font-outfit font-bold text-base sm:text-lg text-foreground group-hover:text-[#ff5500] transition-colors leading-tight">
                                {service.title}
                              </h3>
                            </div>

                            {service.badge && (
                              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#ff5500] to-[#ff7733] text-white shadow-sm shrink-0">
                                {service.badge}
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-muted-foreground leading-relaxed pl-7 line-clamp-2">
                            {service.tagline}
                          </p>
                        </div>

                        {/* Inclusions Preview */}
                        <div className="mt-4 pt-3 border-t border-border/80 flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center text-muted-foreground gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#ff5500]" />
                            <span className="text-[11px] font-medium">{service.duration}</span>
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] text-muted-foreground mr-1">Starts:</span>
                            <span className="text-lg sm:text-xl font-display font-extrabold text-[#ff5500]">
                              ${service.startingPrice}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 1 Continue Footer */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-muted-foreground text-center sm:text-left">
                  Selected: <strong className="text-foreground">{selectedVehicles.length} Vehicle(s)</strong> & <strong className="text-foreground">{selectedServices.length} Package(s)</strong>
                </div>

                <button
                  type="button"
                  onClick={() => goToStep(2)}
                  className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-[#ff5500] to-[#ff7733] hover:from-[#ff661a] hover:to-[#ff884d] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#ff5500]/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Continue to Add-Ons</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STEP 2: SPECIALIZED ADD-ON ENHANCEMENTS */}
          {/* ========================================================================= */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-foreground mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#ff5500]" /> Select Add-On Treatments (Optional)
                </label>
                <p className="text-xs text-muted-foreground mb-4">
                  Boost your detailing packages with specialized deep-cleaning & restoration treatments.
                </p>

                {/* Add-ons 2-Column Clean Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {addOnServices.map((addon) => {
                    const active = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start justify-between gap-3 ${
                          active
                            ? "bg-[#ff5500]/15 border-[#ff5500] shadow-md shadow-[#ff5500]/15"
                            : "bg-secondary/40 border-border hover:border-[#ff5500]/40 hover:bg-secondary/70"
                        }`}
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <div
                            className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${
                              active
                                ? "border-[#ff5500] bg-[#ff5500] text-white"
                                : "border-muted-foreground/50 bg-background"
                            }`}
                          >
                            {active && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                          </div>

                          <div className="min-w-0">
                            <div className="font-outfit font-bold text-sm text-foreground">
                              {addon.name}
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed mt-0.5 line-clamp-2">
                              {addon.description}
                            </p>
                            <div className="flex items-center gap-1.5 text-[11px] text-[#ff5500] mt-1.5 font-medium">
                              <Clock className="w-3 h-3" />
                              <span>{addon.duration}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-sm sm:text-base font-display font-extrabold text-[#ff5500]">
                            {addon.price}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2 Navigation Footer */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => goToStep(1)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-secondary border border-border text-foreground font-bold text-xs uppercase tracking-wider hover:bg-muted transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <div className="text-xs text-muted-foreground text-center sm:text-left">
                  {selectedAddons.length > 0
                    ? `${selectedAddons.length} Add-on(s) Selected (+$${addonsTotal})`
                    : "No add-ons selected (Package base starting price)"}
                </div>

                <button
                  type="button"
                  onClick={() => goToStep(3)}
                  className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-[#ff5500] to-[#ff7733] hover:from-[#ff661a] hover:to-[#ff884d] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#ff5500]/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Continue to Date & Time</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STEP 3: PREFERRED DATE & ARRIVAL TIME SLOT */}
          {/* ========================================================================= */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-foreground mb-1 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[#ff5500]" /> 3. Select Preferred Date & Arrival Window
                </label>
                <p className="text-xs text-muted-foreground mb-4">
                  Mobile service available 7:00 AM – 8:00 PM, 7 Days a Week (Mon - Sun) across the Inland Empire & Southern California.
                </p>

                {/* Prominent Harbaz Hundal Time Slot Confirmation Callout */}
                <div className="p-4 rounded-2xl bg-[#ff5500]/10 border border-[#ff5500]/30 flex items-start space-x-3.5 text-xs text-foreground/90 mb-5 shadow-sm">
                  <Info className="w-5 h-5 text-[#ff5500] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <strong className="text-foreground text-sm font-bold block">
                      Arrival Window & Dispatch Policy:
                    </strong>
                    <p className="leading-relaxed text-muted-foreground">
                      The date and time slot you select is a <strong className="text-foreground">requested arrival preference</strong>. Owner & Lead Detailer <strong className="text-[#ff5500]">Harbaz Hundal</strong> will contact you directly via SMS Text or WhatsApp to confirm or coordinate the exact final arrival window according to our daily mobile route.
                    </p>
                  </div>
                </div>

                {/* Calendar & Time Slots Side-by-Side or Stacked */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Calendar Stage */}
                  <div className="lg:col-span-7">
                    <CustomCalendar
                      selectedDate={selectedDate}
                      onSelectDate={(date) => setSelectedDate(date)}
                    />
                  </div>

                  {/* Arrival Time Slots Stage */}
                  <div className="lg:col-span-5 bg-secondary/40 border border-border rounded-2xl p-4 sm:p-5 flex flex-col justify-between h-full">
                    <div>
                      <h3 className="text-sm font-bold text-foreground mb-1.5 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#ff5500]" /> Preferred Arrival Window
                      </h3>
                      <p className="text-[11px] text-muted-foreground mb-3">
                        Choose your ideal arrival window:
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
                        {availableTimeSlots.map((slot) => {
                          const active = selectedTimeSlot === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTimeSlot(slot)}
                              className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                                active
                                  ? "bg-[#ff5500] text-white shadow-md shadow-[#ff5500]/30 scale-[1.02]"
                                  : "bg-card text-foreground border border-border hover:bg-muted"
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-4 p-3 rounded-xl bg-[#ff5500]/10 border border-[#ff5500]/20 text-xs text-foreground">
                      <div>
                        Selected Date: <strong className="text-[#ff5500]">{selectedDate || "Flexible (Date Not Picked)"}</strong>
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        Requested Slot: <strong>{selectedTimeSlot}</strong> (Subject to final confirmation by Harbaz Hundal)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 Navigation Footer */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => goToStep(2)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-secondary border border-border text-foreground font-bold text-xs uppercase tracking-wider hover:bg-muted transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => goToStep(4)}
                  className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-[#ff5500] to-[#ff7733] hover:from-[#ff661a] hover:to-[#ff884d] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#ff5500]/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Continue to Final Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STEP 4: CONTACT INFORMATION & CONFIRMATION */}
          {/* ========================================================================= */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Order Summary Snapshot Pill */}
              <div className="p-4 rounded-2xl bg-secondary/50 border border-border space-y-2 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-border/80">
                  <span className="font-extrabold uppercase tracking-wider text-[#ff5500]">
                    Booking Summary Breakdown
                  </span>
                  <button
                    type="button"
                    onClick={() => goToStep(1)}
                    className="text-[11px] text-muted-foreground hover:text-[#ff5500] underline cursor-pointer"
                  >
                    Edit Selections
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-foreground/90">
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase font-bold">
                      Vehicle(s) & Package(s)
                    </span>
                    <strong>{selectedVehicles.length} Vehicle(s)</strong> • <strong>{selectedServices.length} Package(s)</strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase font-bold">
                      Requested Window
                    </span>
                    <strong>{selectedDate || "Flexible Date"}</strong> ({selectedTimeSlot})
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase font-bold">
                      Starting Base Estimate
                    </span>
                    <strong className="text-[#ff5500] text-sm">${totalEstimatedPrice}</strong>
                  </div>
                </div>
              </div>

              {/* Notification Preference Toggle */}
              <div className="p-4 rounded-2xl bg-secondary/30 border border-border">
                <div className="text-xs font-bold uppercase text-foreground mb-2">
                  How would you prefer Harbaz Hundal & our dispatch team to confirm your booking?
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNotificationMethod("sms")}
                    className={`p-3 rounded-xl border flex items-center space-x-3 text-left transition-all cursor-pointer ${
                      notificationMethod === "sms"
                        ? "bg-[#ff5500]/20 border-[#ff5500] text-foreground shadow-sm"
                        : "bg-card border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Smartphone
                      className={`w-5 h-5 ${
                        notificationMethod === "sms"
                          ? "text-[#ff5500]"
                          : "text-muted-foreground"
                      }`}
                    />
                    <div>
                      <div className="text-xs font-bold text-foreground">
                        SMS Text Message & Phone Call
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        Direct text & call confirmation (Standard US)
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNotificationMethod("whatsapp")}
                    className={`p-3 rounded-xl border flex items-center space-x-3 text-left transition-all cursor-pointer ${
                      notificationMethod === "whatsapp"
                        ? "bg-emerald-500/20 border-emerald-500 text-foreground shadow-sm"
                        : "bg-card border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <MessageSquare
                      className={`w-5 h-5 ${
                        notificationMethod === "whatsapp"
                          ? "text-emerald-500"
                          : "text-muted-foreground"
                      }`}
                    />
                    <div>
                      <div className="text-xs font-bold text-foreground">
                        WhatsApp Message
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        Direct chat via WhatsApp
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Input Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Smith"
                      className={`w-full bg-background border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 ${
                        formErrors.name
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-border focus:border-[#ff5500] focus:ring-[#ff5500]"
                      }`}
                    />
                  </div>
                  {formErrors.name && (
                    <p className="text-[11px] text-red-500 mt-1">{formErrors.name}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                    Phone Number (SMS / Call) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (951) 000-0000"
                      className={`w-full bg-background border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 ${
                        formErrors.phone
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-border focus:border-[#ff5500] focus:ring-[#ff5500]"
                      }`}
                    />
                  </div>
                  {formErrors.phone && (
                    <p className="text-[11px] text-red-500 mt-1">{formErrors.phone}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`w-full bg-background border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 ${
                        formErrors.email
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-border focus:border-[#ff5500] focus:ring-[#ff5500]"
                      }`}
                    />
                  </div>
                  {formErrors.email && (
                    <p className="text-[11px] text-red-500 mt-1">{formErrors.email}</p>
                  )}
                </div>

                {/* Service Address - Full Width Highlighted Field */}
                <div className="sm:col-span-2 bg-secondary/30 border border-border/80 rounded-2xl p-3.5 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <label className="block text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#ff5500]" />
                      <span>Exact Service Address (Home Driveway / Workplace Parking) *</span>
                    </label>
                    <span className="text-[10px] text-[#ff5500] font-bold uppercase tracking-wider bg-[#ff5500]/10 px-2 py-0.5 rounded-md self-start sm:self-auto">
                      Exact Location Required
                    </span>
                  </div>

                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="e.g. 12345 Citrus Blossom Dr, Apt 4B, Riverside, CA 92506"
                      className={`w-full bg-background border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 ${
                        formErrors.address
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-border focus:border-[#ff5500] focus:ring-[#ff5500]"
                      }`}
                    />
                  </div>

                  <p className="text-[11px] text-muted-foreground mt-2 flex items-start gap-1.5 leading-relaxed">
                    <Info className="w-3.5 h-3.5 text-[#ff5500] shrink-0 mt-0.5" />
                    <span>
                      Please enter your <strong className="text-foreground">exact street address</strong> (House / Apt #, Street Name, City & Zip Code) so Harbaz Hundal's fully equipped mobile detailing unit can arrive directly at your vehicle.
                    </span>
                  </p>

                  {formErrors.address && (
                    <p className="text-[11px] text-red-500 mt-1.5 font-medium">{formErrors.address}</p>
                  )}
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                  Vehicle Make, Model & Special Requests (Optional)
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 absolute left-3.5 top-3.5 text-muted-foreground pointer-events-none" />
                  <textarea
                    name="notes"
                    rows={2}
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="e.g. 2023 Tesla Model Y, heavy dog hair in backseat, stain on driver seat..."
                    className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500]"
                  />
                </div>
              </div>

              {/* Action Buttons & Submit Footer */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => goToStep(3)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-secondary border border-border text-foreground font-bold text-xs uppercase tracking-wider hover:bg-muted transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleStandardSubmit}
                  className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-[#ff5500] to-[#ff7733] hover:from-[#ff661a] hover:to-[#ff884d] text-white font-extrabold text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-2.5 shadow-xl shadow-[#ff5500]/35 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Submit Appointment</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* CONFIRMATION POPUP MODAL */}
        {/* ========================================================================= */}
        {isSubmitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-card border border-[#ff5500]/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative text-center">
              <button
                onClick={() => setIsSubmitted(false)}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground rounded-full bg-secondary cursor-pointer transition-colors"
                aria-label="Close confirmation dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 bg-[#ff5500]/20 rounded-full border-2 border-[#ff5500] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-[#ff5500]" />
              </div>

              <h3 className="text-2xl font-display font-extrabold text-foreground uppercase">
                Appointment Request Ready!
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm mt-2 leading-relaxed">
                Thank you, <span className="text-[#ff5500] font-bold">{formData.name || "Valued Customer"}</span>! Choose how you would like to send your pre-filled booking details to owner <strong className="text-foreground">Harbaz Hundal</strong>:
              </p>

              <div className="mt-5 p-4 rounded-2xl bg-secondary/50 border border-border text-left text-xs space-y-1.5 text-muted-foreground">
                <div>
                  <strong className="text-foreground">Vehicle(s):</strong>{" "}
                  {selectedVehicles
                    .map((id) => vehicleCategories.find((v) => v.id === id)?.name)
                    .join(", ")}
                </div>
                <div>
                  <strong className="text-foreground">Package(s):</strong>{" "}
                  {selectedServices
                    .map((id) => servicesData.find((s) => s.id === id)?.title)
                    .join(", ")}
                </div>
                <div>
                  <strong className="text-foreground">Requested Window:</strong>{" "}
                  {selectedDate || "Flexible Date"} ({selectedTimeSlot})
                </div>
                <div>
                  <strong className="text-foreground">Service Address:</strong> {formData.address || "On-site"}
                </div>
                <div>
                  <strong className="text-foreground">Starting Base Estimate:</strong> ${totalEstimatedPrice}
                </div>
              </div>

              {/* Direct Send Actions (WhatsApp / SMS / Call) */}
              <div className="mt-5 flex flex-col gap-2.5">
                {/* 1. Send via WhatsApp */}
                <button
                  onClick={() => {
                    const msg = formatSummaryMessage();
                    window.open(siteConfig.getWhatsAppUrl(msg), "_blank");
                  }}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-emerald-900/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </button>

                {/* 2. Send via SMS Text Message */}
                <button
                  onClick={() => {
                    const msg = formatSummaryMessage();
                    window.location.href = siteConfig.getSmsUrl(msg);
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#ff7733] hover:from-[#ff661a] hover:to-[#ff884d] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer shadow-md shadow-[#ff5500]/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Send via SMS Text Message</span>
                </button>

                {/* 3. Call Harbaz Directly */}
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="w-full py-2.5 rounded-xl bg-secondary hover:bg-muted text-foreground font-semibold text-xs flex items-center justify-center space-x-1.5 cursor-pointer border border-border transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#ff5500]" />
                  <span>Call Harbaz Directly: {siteConfig.phone}</span>
                </a>

                {/* Close Button */}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full py-2 text-muted-foreground hover:text-foreground font-semibold text-xs cursor-pointer transition-colors"
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
