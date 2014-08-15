var selectedFeatureName = null;

function showFeature(aFeatureName) {
    hideAllFeatures();
    if (selectedFeatureName!==aFeatureName) {
        selectedFeatureName=aFeatureName;
        $("." + selectedFeatureName + ".featureDescription").show();
        $("." + selectedFeatureName + ".featureTag").addClass("selected");
        $('html, body').animate({
                        scrollTop: $("." + selectedFeatureName + ".featureTag").offset().top - 50
                    }, 500);
    } else {
        selectedFeatureName = null;
    }
}

function hideAllFeatures() {
    $( ".featureDescription" ).hide();
    $(".featureTag").removeClass("selected");
}

hideAllFeatures();