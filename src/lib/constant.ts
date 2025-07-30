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
    notes: "Internal notes about this provider..."
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