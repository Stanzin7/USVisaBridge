/**
 * US Visa Slot Checker - Content Script
 * 
 * This script runs on usvisascheduling.com pages and injects
 * the checkvisaslots function into the page context.
 * 
 * Open-source patch for transparency - read-only, no automation.
 */

(function() {
  'use strict';

  // Inject the actual slot checking logic into the page context
  // This allows checkvisaslots to access the page's DOM and data
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('injected.js');
  script.onload = function() {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(script);

  // Listen for messages from the injected script
  window.addEventListener('message', (event) => {
    // Only accept messages from the same origin (the page itself)
    if (event.source !== window) return;

    // Handle slot data submissions
    if (event.data && event.data.type === 'VISASLOT_CHECK_RESULT') {
      // Send to background script for API submission
      chrome.runtime.sendMessage({
        type: 'SLOT_DATA',
        data: event.data.slotData,
        timestamp: Date.now()
      }).catch(err => {
        console.log('[VisaSlot] Extension not connected:', err);
      });
    }

    // Handle requests for API configuration
    if (event.data && event.data.type === 'VISASLOT_GET_CONFIG') {
      chrome.runtime.sendMessage({
        type: 'GET_CONFIG'
      }, (response) => {
        window.postMessage({
          type: 'VISASLOT_CONFIG',
          config: response || {}
        }, '*');
      });
    }
  });

  // Create a visible indicator on the page when extension is active
  const createIndicator = () => {
    const indicator = document.createElement('div');
    indicator.id = 'visaslot-indicator';
    indicator.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(34, 197, 94, 0.9);
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-family: system-ui, -apple-system, sans-serif;
      z-index: 999999;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      display: none;
    `;
    indicator.textContent = '🔍 Visa Slot Checker Active';
    document.body.appendChild(indicator);

    // Show indicator briefly on load
    indicator.style.display = 'block';
    setTimeout(() => {
      indicator.style.opacity = '0';
      indicator.style.transition = 'opacity 0.3s';
      setTimeout(() => indicator.remove(), 300);
    }, 2000);
  };

  // Wait for DOM to be ready
  if (document.body) {
    createIndicator();
  } else {
    document.addEventListener('DOMContentLoaded', createIndicator);
  }
})();


