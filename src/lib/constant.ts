export const ADD_NEW_PROVIDER = {
  placeholder: {
    name: "Ex:Al-Haramain Travel Agency",
    description: "Brief description of the travel agency...",
    email: "info@provider.com",
    phone: "+1 (555) 123-4567",
    website: "https://www.provider.com",
    address: "Street address, city, state, zip code",
    license: "License number",
    established: "2020",
    notes: "Internal notes about this provider...",
    rating: "Ratings from 1 to 5",
  },  
  providerStatusOptions: [
    { label: "Pending", value: "pending" },
    { label: "Active", value: "active" },
    { label: "Suspended", value: "suspended" },
  ],  
  providerEmployeesOptions: [
    { label: "1-10", value: "1-10" },
    { label: "11-50", value: "11-50" },
    { label: "51-100", value: "51-100" },
    { label: "100+", value: "100+" },
  ], 
  providerServicesOptions: [
    { label: "Hajj Packages", value: "hajj" },
    { label: "Umrah Packages", value: "umrah" },
    { label: "Both Hajj & Umrah", value: "both" },
  ], 
  providerVerificationStatusOptions: [
    { label: "Pending", value: "pending" },
    { label: "Verified", value: "verified" },
    { label: "Rejected", value: "rejected" },
  ], 
};

export const CREATE_PACKAGE = {
  placeholder: {
    title: "Umrah Deluxe Package 2024",
    packageDescription: "Detailed description of the package including accommodations, transport, and services...",
    duration: "1",
    departureDescription: "Departure city, airport details, and timing information...",
    locations: "Makkah, Madinah, Mina",
    makkahHotel: "Hotel name and rating",
    madinahHotel: "Hotel name and rating",
    priceFrom: "3500",
    priceTo: "4200",
    capacity: "50",
    minimumBooking: "1",
    inclusions: "List all included services: flights, accommodation, meals, transport, guides, etc.",
    exclusions: "List services not included: personal expenses, optional tours, etc.",
    tags: "family-friendly, budget, luxury",
  }, 
  packageRoomTypeOptions: [
    { label: "Single Room", value: "single" },
    { label: "Double Room", value: "double" },
    { label: "Triple Room", value: "triple" },
    { label: "Quad Room", value: "quad" }
  ], 
  packageTypeOptions: [
    { label: "Hajj", value: "hajj" },
    { label: "Umrah", value: "umrah" },
    { label: "Hajj & Umrah", value: "both" },
  ], 
  packageCurrencyOptions: [
    { label: "INR", value: "inr" }
  ], 
  packageCategoryOptions: [
    { label: "Economy", value: "economy" },
    { label: "Standard", value: "standard" },
    { label: "Deluxe", value: "deluxe" },
    { label: "Premium", value: "premium" },
    { label: "Luxury", value: "luxury" },
  ], 
};