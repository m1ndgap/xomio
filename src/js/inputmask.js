let $phoneInputs = document.querySelectorAll('[data-mask="phone"]');

if ($phoneInputs.length !== 0) {
    for (const inputPhone of $phoneInputs) {
        Inputmask({"mask": "+1 999 999 99 99"}).mask(inputPhone);
    }
}