document.addEventListener("DOMContentLoaded", function () {
    const iosUrl = "https://apps.apple.com/br/app/safer/id1394115795";
    const androidUrl = "https://play.google.com/store/apps/details?id=com.zins.client&pcampaignid=web_share";
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
        window.location.href = androidUrl;
        return;
    }

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        window.location.href = iosUrl;
    }
});