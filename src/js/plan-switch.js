/* Switch */
$.fn.toggleText = function(t1, t2){
    if (this.text() == t1) {
        this.text(t2);
    } else {
        this.text(t1);
    }
    return this;
};

$(document).ready(function(){
    let $paymentSwitch = $('[data-component="payment-swich"]');

    $paymentSwitch.each(function(index, switchEl) {
        let $switch = $(switchEl);
        let $switchControl = $switch.find('input:radio');


        $switchControl.on('change', function(e) {
            let $control = $(this);
            let $dataEl = $switch.find('[data-element="payment-swich-data"]');

            if ($control.val() == 'left') {
                $dataEl.each(function(index, elem) {
                    $(elem).toggleText($(elem).attr('data-left'), $(elem).attr('data-right'));
                });
            } else if ($control.val() == 'right') {
                $dataEl.each(function(index, elem) {
                    $(elem).toggleText($(elem).attr('data-right'), $(elem).attr('data-left'));
                });
            }
        });
    });
});