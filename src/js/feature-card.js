/* Feature card */
$(document).ready(function(){
    let $featureCardToggle = $('[data-element="feature-card-toggle"]');

    $featureCardToggle.on('click', function(e){
        e.preventDefault();

        let $toggle  = $(this);
        let $card = $toggle.closest('[data-component="feature-card"]');
        let cardHeight = $card[0].scrollHeight;
        let $activeSibling = $('.'+expandedClass+'[data-component="feature-card"]');

        if ($card.hasClass(expandedClass)) {
            $card.removeClass(expandedClass);
            $card.css('height', '');
        } else {
            $activeSibling.removeClass(expandedClass);
            $activeSibling.css('height', '');
            $card.addClass(expandedClass);
            $card.css('height', cardHeight);
        }
    });
});