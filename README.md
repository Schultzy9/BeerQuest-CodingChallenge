# Beer Quest

A responsive Next.js app for searching, filtering, and exploring breweries using the Open Brewery DB API.

---

## Features

- **Autosuggest Search:**  
  Debounced, responsive input with instant brewery suggestions.
- **Filtering Panel:**  
  Filter breweries by name and city.
- **Paginated Table:**  
  View breweries with pagination, responsive design, and clickable rows.
- **Brewery Details:**  
  Detailed view with map, all key info, and robust handling of missing data.
- **Easter Egg:**  
  Try filtering by name `"Meow"` and city `"Meow Meow"`!
- **Full Test Coverage:**  
  Custom hooks and components tested with Jest and React Testing Library.

---

## Getting Started

```bash
git clone https://github.com/your-username/brewery-explorer.git
cd brewery-explorer
npm install
npm run dev
```

Visit http://localhost:3000 in your browser.

---

## Project Journey

- **Initial Setup:**  
  Started with Next.js (App Router) and TypeScript for type safety and modern React features.
- **Autosuggest & Debounce:**  
  Implemented a custom useDebounce hook and autosuggest input, ensuring smooth UX and minimal API calls.
- **API Integration:**  
  Used the Open Brewery DB API, handling nullable fields and edge cases.
- **Responsive Design:**  
  Refactored CSS to use modules and media queries for a consistent look on all devices.
- **Testing:**  
  Added unit tests for hooks and components, mocking fetch and handling async updates.

Overall this challenge was a lot of fun. Still quite new Next.js but enjoyed all the learning and implementation. Plenty of mistakes and issues along the way (CORS dramas being the most infuriating). Heaps of room for improvement.

---

## Future Upgrades

- **Better Pagination:**  
  Show total pages, disable "Next" when on the last page, or add infinite scroll.
- **Improved Accessibility:**  
  Add ARIA labels, keyboard navigation, and focus management. Avoid disabling buttons.
- **API Integration:**  
  Used the Open Brewery DB API, handling nullable fields and edge cases.
- **Colocate Component Files:**  
  Move to a folder-per-component structure for even better maintainability.
- **More Filters:**  
  Filter by brewery type, state, or country.
- **Improvements to UI**
  Make it look way nicer. Probably utilise tailwind or something similar.

---

## Easter Egg
  Try searching for name: Meow and city: Meow Meow in the filter panel!