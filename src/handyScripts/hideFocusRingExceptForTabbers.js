export default function hideFocusRingExceptForTabbers() {
  const handleFirstTab = function handleFirstTab(e) {
    if (e.keyCode === 9) { // the "I am a keyboard user" key
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
    }
  }

  window.addEventListener('keydown', handleFirstTab);
}

// Must add to global css: 
// body:not(.user-is-tabbing) button:focus,
// body:not(.user-is-tabbing) input:focus,
// body:not(.user-is-tabbing) select:focus,
// body:not(.user-is-tabbing) textarea:focus {
//   outline: none;
// }