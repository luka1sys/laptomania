# Panel Page - Code Changes

## Key Changes Overview

### 1. Added State Management

**Before:**
```jsx
const Panel = () => {
    const { user, users, logout, getUsers } = useAuth();

    useEffect(() => {
        getUsers();
    }, []);

    return (
        // Direct rendering of all components
    )
}
```

**After:**
```jsx
const Panel = () => {
    const { user, users, logout, getUsers } = useAuth();
    const [activeView, setActiveView] = useState(null); // NEW: State for view control

    useEffect(() => {
        getUsers();
    }, []);

    return (
        // Conditional rendering based on activeView
    )
}
```

---

### 2. Navigation Buttons Section

**Before:**
```jsx
{(user.role === "admin" || user.role === "moderator") && (
    <>
        <Catalog />
        <AddLaptop />
    </>
)}
```

**After:**
```jsx
{(user.role === "admin" || user.role === "moderator") && (
    <>
        {/* Navigation Buttons */}
        <div className="glass-effect rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold gradient-text mb-6 text-center">
                Management Panel
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                    onClick={() => setActiveView(activeView === 'laptops' ? null : 'laptops')}
                    className={/* Dynamic classes based on activeView */}
                >
                    <div className="flex items-center justify-center gap-2">
                        <svg className="w-6 h-6" /* ... */>
                            {/* Laptop icon */}
                        </svg>
                        <span>Laptops</span>
                    </div>
                </button>

                <button
                    onClick={() => setActiveView(activeView === 'users' ? null : 'users')}
                    className={/* Dynamic classes based on activeView */}
                >
                    <div className="flex items-center justify-center gap-2">
                        <svg className="w-6 h-6" /* ... */>
                            {/* Users icon */}
                        </svg>
                        <span>Users</span>
                    </div>
                </button>

                <button
                    onClick={() => setActiveView(activeView === 'addLaptop' ? null : 'addLaptop')}
                    className={/* Dynamic classes based on activeView */}
                >
                    <div className="flex items-center justify-center gap-2">
                        <svg className="w-6 h-6" /* ... */>
                            {/* Plus icon */}
                        </svg>
                        <span>Add Laptop</span>
                    </div>
                </button>
            </div>
        </div>

        {/* Conditional Content Rendering */}
        <div className="transition-all duration-500 ease-in-out">
            {activeView === 'laptops' && (
                <div className="animate-fadeIn">
                    <Catalog />
                </div>
            )}

            {activeView === 'users' && (
                <div className="animate-fadeIn">
                    {/* Users list component */}
                </div>
            )}

            {activeView === 'addLaptop' && (
                <div className="animate-fadeIn">
                    <AddLaptop />
                </div>
            )}
        </div>
    </>
)}
```

---

### 3. Users List Display

**Before:**
```jsx
{users.length > 0 && (
    users.map((user) => (
        <div key={user._id}>
            <h2>{user.fullname}</h2>
            <p>{user.email}</p>
            <p>{user.role}</p>
        </div>
    ))
)}
```

**After:**
```jsx
{activeView === 'users' && (
    <div className="animate-fadeIn">
        <div className="glass-effect rounded-2xl p-8">
            <h2 className="text-3xl font-bold gradient-text mb-6">Users List</h2>
            {users.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map((user) => (
                        <div
                            key={user._id}
                            className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                    {user.fullname?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-800">{user.fullname}</h3>
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                        user.role === 'admin' 
                                            ? 'bg-red-100 text-red-700' 
                                            : user.role === 'moderator'
                                            ? 'bg-orange-100 text-orange-700'
                                            : 'bg-blue-100 text-blue-700'
                                    }`}>
                                        {user.role}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <svg className="w-4 h-4" /* ... */>
                                        {/* Email icon */}
                                    </svg>
                                    <span className="break-all">{user.email}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No users found.</p>
                </div>
            )}
        </div>
    </div>
)}
```

---

### 4. Dynamic Button Classes

**Implementation:**
```jsx
className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
    activeView === 'laptops'
        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
        : 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 hover:from-indigo-200 hover:to-purple-200'
}`}
```

**Explanation:**
- When `activeView === 'laptops'`: Dark gradient with white text
- When `activeView !== 'laptops'`: Light gradient with colored text
- Hover effects: Scale up and enhanced shadow
- Smooth transitions for all state changes

---

### 5. Toggle Functionality

**Implementation:**
```jsx
onClick={() => setActiveView(activeView === 'laptops' ? null : 'laptops')}
```

**Behavior:**
- If section is closed (`activeView !== 'laptops'`): Open it
- If section is open (`activeView === 'laptops'`): Close it
- Only one section can be open at a time

---

### 6. CSS Animation Addition

**New CSS in `index.css`:**
```css
.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Usage:**
```jsx
<div className="animate-fadeIn">
    <Catalog />
</div>
```

---

## Import Changes

**Before:**
```jsx
import { useEffect } from "react";
```

**After:**
```jsx
import { useEffect, useState } from "react";
```

---

## Component Structure Comparison

### Before
```
Panel
├── User Dashboard
│   ├── User Info
│   └── Logout
│   └── Users List (inline)
└── Admin Section
    ├── Catalog (always shown)
    └── AddLaptop (always shown)
```

### After
```
Panel
├── User Dashboard
│   ├── User Info
│   └── Logout
└── Management Panel
    ├── Navigation Buttons
    │   ├── Laptops Button
    │   ├── Users Button
    │   └── Add Laptop Button
    └── Conditional Content
        ├── Laptops View (conditional)
        ├── Users View (conditional)
        └── Add Laptop View (conditional)
```

---

## State Flow Diagram

```
Initial State: activeView = null
                    ↓
User clicks "Laptops"
                    ↓
activeView = 'laptops'
                    ↓
Laptops section renders with fadeIn animation
                    ↓
User clicks "Users"
                    ↓
activeView = 'users'
                    ↓
Laptops section unmounts, Users section renders with fadeIn
                    ↓
User clicks "Users" again
                    ↓
activeView = null
                    ↓
Users section unmounts
```

---

## Responsive Grid Classes

### Navigation Buttons
```jsx
className="grid grid-cols-1 md:grid-cols-3 gap-4"
```
- Mobile: 1 column (stacked)
- Tablet+: 3 columns (side by side)

### Users List
```jsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

---

## SVG Icons Used

### Laptop Icon
```jsx
<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
</svg>
```

### Users Icon
```jsx
<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
</svg>
```

### Plus Icon
```jsx
<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M12 4v16m8-8H4" />
</svg>
```

### Email Icon
```jsx
<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
</svg>
```

---

## Testing Checklist

✅ Buttons toggle correctly
✅ Only one section shows at a time
✅ Clicking same button closes section
✅ Fade-in animation works smoothly
✅ Responsive layout on mobile/tablet/desktop
✅ User roles display with correct colors
✅ All existing functionality preserved
✅ No console errors
✅ Hover effects work properly
✅ Icons display correctly
