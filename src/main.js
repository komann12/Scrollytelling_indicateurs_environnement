/* SCROLLAMA */


const main = d3.select("main");
const scrolly = main.select("#scrolly");
const figure = scrolly.selectAll("figure");
const dataviz1 = scrolly.select("#my_dataviz");
const dataviz2 = scrolly.select("#my_dataviz2");
const dataviz3 = scrolly.select("#my_dataviz3");
const step1_items = dataviz1.selectAll(".step-1");
const step2_items = dataviz2.selectAll(".step-5");
const step3_items = dataviz3.selectAll(".step-10");
const diag = dataviz3.select("#viz3_svg");
const article = scrolly.select("article");
const step = article.selectAll(".step");
const scroller = scrollama();
let third_viz_done = false;

function handleResize() {
    var stepH = Math.floor(window.innerHeight * 0.75);
    step.style("height", stepH + "px");
    var figureHeight = window.innerHeight / 1.7;
    var figureMarginTop = (window.innerHeight - figureHeight) / 2;
    figure
        .style("height", figureHeight + "px")
        .style("top", figureMarginTop + "px");
    scroller.resize();
}

function handleStepEnter(response) {
    step.classed("is-active", function (d, i) {
        return i === response.index;
    });

    console.log(response.index);
    if (response.index === 0) {
        presentation_viz1();
    } else if (response.index === 1) {
        prediction_viz1();
    } else if (response.index === 2) {
        resultat_viz1();
    } else if (response.index === 3){
        aller_plus_loin_viz1();
    } else if (response.index === 4){
        transition_viz1();
    } else if (response.index === 5){
        presentation_viz2();
    } else if (response.index === 6) {
        prediction_viz2();
    } else if (response.index === 7){
        resultat_viz2();
    } else if (response.index === 8){
        aller_plus_loin_viz2();
    } else if (response.index === 9){
        transition_viz2();
    } else if (response.index === 10){
        presentation_viz3();
    } else if (response.index === 11) {
        prediction_viz3();
    } else if (response.index === 12){
        resultat_viz3();
    }
}

function setupStickyfill() {
    d3.selectAll(".sticky").each(function () {
        Stickyfill.add(this);
    });
}

function init() {
    setupStickyfill();
    handleResize();
    scroller
        .setup({
            step: "#scrolly article .step",
            offset: 0.33,
            debug: false
        })
        .onStepEnter(handleStepEnter);
    window.addEventListener("resize", handleResize);
}

init();

let current_score = 0;

create_first_viz("#viz1_svg", "https://komann12.github.io/Scrollytelling_indicateurs_environnement/data/ER.H2O.INTR.PC.json");

create_second_viz("#viz2_svg", "https://komann12.github.io/Scrollytelling_indicateurs_environnement/data/ER.H2O.INTR.K3.json");

create_third_viz("#viz3_svg");

/* GENERAL */

document.getElementById("bet-button").addEventListener("click", () => {
    window.scroll({
        top: 0.8 * window.innerHeight * 2.5,
        behavior: 'smooth'
    });
});
