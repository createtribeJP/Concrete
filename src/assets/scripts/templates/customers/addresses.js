/**
 * Customer Addresses Scripts
 * ------------------------------------------------------------------------------
 * This file that contains scripts for the Customer Addresses template
 * template.
 *
 * @namespace customerAddresses
 */

// <!-- TO DO -->


import $ from 'jquery';

const $newAddressForm = $('#AddressNewForm');

if ($newAddressForm.length) {
  // Initialize observers on address selectors, defined in shopify_common.js
  if (Shopify) {
    new Shopify.CountryProvinceSelector(
      'AddressCountryNew',
      'AddressProvinceNew',
      {
        hideElement: 'AddressProvinceContainerNew',
      },
    );
  }

  // Initialize each edit form's country/province selector
  $('.address-country-option').each(function() {
    const formId = $(this).data('form-id');
    const countrySelector = `AddressCountry_${formId}`;
    const provinceSelector = `AddressProvince_${formId}`;
    const containerSelector = `AddressProvinceContainer_${formId}`;

    new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
      hideElement: containerSelector,
    });
  });

  // Toggle new/edit address forms
  $('.address-new-toggle').on('click', () => {
    $newAddressForm.toggleClass('hide');
  });

  $('.address-edit-toggle').on('click', function() {
    const formId = $(this).data('form-id');
    $(`#EditAddress_${formId}`).toggleClass('hide');
  });

  $('.address-delete').on('click', function() {
    const $el = $(this);
    const formId = $el.data('form-id');
    const confirmMessage = $el.data('confirm-message');
    if (
      window.confirm(
        confirmMessage || 'Are you sure you wish to delete this address?',
      )
    ) {
      Shopify.postLink(`/account/addresses/${formId}`, {
        parameters: {_method: 'delete'},
      });
    }
  });
}