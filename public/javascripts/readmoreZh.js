function readMoreFunctionZh() {
    var dots = document.getElementById("dot");
    var moreText = document.getElementById("moreZh");
    var btnText = document.getElementById("moreBtnZh");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "更多";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "收起";
        moreText.style.display = "inline";
    }
}