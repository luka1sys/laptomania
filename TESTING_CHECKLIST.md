# Cart Refactoring - Testing Checklist

## ✅ Pre-Refactoring Issues
- [x] Cart button was only visible to logged-in users
- [x] Guest users could not access the cart
- [x] Guest users could not see cart items even after adding them

## ✅ Post-Refactoring Verification

### Guest User Testing

#### Navigation & Visibility
- [ ] Open the app without logging in
- [ ] Verify "Cart" button is visible in the navigation bar
- [ ] Verify "Login" and "Sign Up" buttons are visible
- [ ] Verify "Panel" and "Logout" buttons are NOT visible

#### Adding Items to Cart
- [ ] Navigate to `/laptops` page
- [ ] Click "Add to Cart" on a laptop
- [ ] Verify cart badge appears with count "1"
- [ ] Add another laptop
- [ ] Verify cart badge updates to "2" (or total quantity)

#### Cart Sidebar Functionality
- [ ] Click the "Cart" button
- [ ] Verify cart sidebar slides in from the left
- [ ] Verify both laptops are displayed in the cart
- [ ] Verify each item shows:
  - [ ] Product image
  - [ ] Brand and model name
  - [ ] Quantity controls (-, quantity, +)
  - [ ] Unit price
  - [ ] Total price (unit × quantity)
  - [ ] Remove button

#### Quantity Management
- [ ] Click "+" button on an item
- [ ] Verify quantity increases
- [ ] Verify total price updates
- [ ] Verify cart badge updates
- [ ] Click "-" button
- [ ] Verify quantity decreases
- [ ] Verify total price updates
- [ ] Click "-" until quantity reaches 0
- [ ] Verify item is removed from cart

#### Cart Summary
- [ ] Verify "Total Items" count is correct
- [ ] Verify "Total Price" calculation is correct
- [ ] Add multiple items with different quantities
- [ ] Verify calculations are accurate

#### Remove & Clear Functions
- [ ] Click "Remove" on an item
- [ ] Verify item is removed immediately
- [ ] Add multiple items
- [ ] Click "Clear Cart"
- [ ] Verify all items are removed
- [ ] Verify "Your cart is empty" message appears

#### Persistence Testing
- [ ] Add items to cart as guest
- [ ] Refresh the page (F5)
- [ ] Verify cart items are still present
- [ ] Verify quantities are preserved
- [ ] Close the browser tab
- [ ] Reopen the app
- [ ] Verify cart items persist (localStorage)

#### Overlay & Close
- [ ] Open cart sidebar
- [ ] Click outside the sidebar (on overlay)
- [ ] Verify sidebar closes
- [ ] Open cart sidebar again
- [ ] Click the "×" close button
- [ ] Verify sidebar closes

---

### Logged-In User Testing

#### Login Flow
- [ ] Add items to cart as guest
- [ ] Click "Login"
- [ ] Log in with valid credentials
- [ ] Verify cart items from guest session are preserved
- [ ] Verify cart badge still shows correct count

#### Navigation & Visibility
- [ ] Verify "Cart" button is still visible
- [ ] Verify "Panel" button is now visible
- [ ] Verify "Logout" button is now visible
- [ ] Verify "Login" and "Sign Up" buttons are NOT visible

#### Cart Functionality (Logged-In)
- [ ] Click "Cart" button
- [ ] Verify all cart functions work:
  - [ ] Add items
  - [ ] Remove items
  - [ ] Adjust quantities
  - [ ] Clear cart
- [ ] Verify cart sidebar displays correctly
- [ ] Verify all calculations are accurate

#### Logout Flow
- [ ] Add items to cart while logged in
- [ ] Click "Logout"
- [ ] Verify you're redirected to login page
- [ ] Navigate back to home page
- [ ] Verify "Cart" button is still visible
- [ ] Open cart
- [ ] Verify cart items are still present (localStorage)

#### Re-login Flow
- [ ] Log in again
- [ ] Verify cart items are still present
- [ ] Verify quantities are preserved

---

### Cross-Browser Testing

#### Chrome
- [ ] Test all guest user scenarios
- [ ] Test all logged-in user scenarios
- [ ] Verify localStorage works correctly

#### Firefox
- [ ] Test all guest user scenarios
- [ ] Test all logged-in user scenarios
- [ ] Verify localStorage works correctly

#### Edge
- [ ] Test all guest user scenarios
- [ ] Test all logged-in user scenarios
- [ ] Verify localStorage works correctly

#### Safari (if available)
- [ ] Test all guest user scenarios
- [ ] Test all logged-in user scenarios
- [ ] Verify localStorage works correctly

---

### Edge Cases

#### Empty Cart
- [ ] Open cart when empty
- [ ] Verify "Your cart is empty" message displays
- [ ] Verify "Add some laptops to get started!" message displays
- [ ] Verify no errors in console

#### Large Quantities
- [ ] Add an item to cart
- [ ] Click "+" button 20+ times
- [ ] Verify quantity updates correctly
- [ ] Verify total price calculates correctly
- [ ] Verify no UI breaks or overflow issues

#### Multiple Items
- [ ] Add 10+ different laptops to cart
- [ ] Verify cart sidebar scrolls correctly
- [ ] Verify all items are visible
- [ ] Verify performance is acceptable

#### Rapid Clicking
- [ ] Rapidly click "Add to Cart" button
- [ ] Verify quantity increases correctly
- [ ] Rapidly click "+" and "-" buttons
- [ ] Verify no race conditions or errors

#### Network Issues
- [ ] Disconnect internet
- [ ] Try to add items to cart
- [ ] Verify cart still works (client-side only)
- [ ] Reconnect internet
- [ ] Verify cart still functions

---

### Responsive Design Testing

#### Desktop (1920×1080)
- [ ] Verify cart button is visible
- [ ] Verify cart sidebar width is appropriate
- [ ] Verify all elements are properly aligned

#### Laptop (1366×768)
- [ ] Verify cart button is visible
- [ ] Verify cart sidebar doesn't overflow
- [ ] Verify all elements are readable

#### Tablet (768×1024)
- [ ] Verify cart button is visible
- [ ] Verify cart sidebar width adjusts
- [ ] Verify touch interactions work

#### Mobile (375×667)
- [ ] Verify cart button is visible
- [ ] Verify cart sidebar takes appropriate width
- [ ] Verify all buttons are tappable
- [ ] Verify text is readable

---

### Console & Error Checking

#### Browser Console
- [ ] Open browser DevTools console
- [ ] Perform all cart operations
- [ ] Verify no errors appear
- [ ] Verify no warnings appear

#### Network Tab
- [ ] Open Network tab
- [ ] Add items to cart
- [ ] Verify no unnecessary API calls
- [ ] Verify localStorage is being used

#### Application Tab
- [ ] Open Application tab → Local Storage
- [ ] Add items to cart
- [ ] Verify 'cart' key exists
- [ ] Verify cart data is properly formatted JSON
- [ ] Clear cart
- [ ] Verify 'cart' key updates to empty array

---

## ✅ Success Criteria

All of the following must be true:

1. ✅ Cart is visible to guest users
2. ✅ Cart is visible to logged-in users
3. ✅ Guest users can add items to cart
4. ✅ Guest users can view cart sidebar
5. ✅ Guest users can modify cart (add/remove/adjust)
6. ✅ Cart persists across page refreshes
7. ✅ Cart persists when user logs in
8. ✅ Cart persists when user logs out
9. ✅ All cart calculations are accurate
10. ✅ No console errors
11. ✅ No broken UI elements
12. ✅ Responsive design works on all screen sizes
13. ✅ localStorage is functioning correctly
14. ✅ User-specific navigation (Panel/Logout) only shows for logged-in users
15. ✅ Guest navigation (Login/Sign Up) only shows for guests

---

## 🐛 Known Issues / Limitations

- None identified (to be updated during testing)

---

## 📝 Notes

- Cart data is stored in localStorage, not on the server
- Cart is client-side only and not synced to user accounts
- If localStorage is cleared, cart data will be lost
- Cart data is browser-specific (not shared across devices)

---

**Testing Date:** _____________  
**Tested By:** _____________  
**Browser/Version:** _____________  
**OS:** _____________  
**Result:** ☐ Pass ☐ Fail  
**Comments:** _____________________________________________
