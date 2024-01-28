"use client";
import React, {useEffect } from 'react'

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: any;
        InlineLayout: any;
      };
    };
    googleTranslateElementInit: () => void;
  }
}

const GoogleTranslate = () => {
    useEffect(() => {
        let addScript = document.createElement('script');
        addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
      }, [])
    
      let duplicate_google_translate_counter = 0;
    
      const googleTranslateElementInit = () => {
        if (duplicate_google_translate_counter > 0) {
          return;
        }
        duplicate_google_translate_counter++;
    
        
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: "en,no,de,", // list of languages to display
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');
      }

    return (
        <div id="google_translate_element"></div>
    );
};

export default GoogleTranslate;

