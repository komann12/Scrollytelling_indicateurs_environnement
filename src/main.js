/* SCROLLAMA */


const main = d3.select("main");
const scrolly = main.select("#scrolly");
const figure = scrolly.selectAll("figure");
const dataviz1 = scrolly.select("#my_dataviz");
const dataviz2 = scrolly.select("#my_dataviz2");
const dataviz3 = scrolly.select("#my_dataviz3");
const dataviz4 = scrolly.select("#my_dataviz4");
const step1_items = dataviz1.selectAll(".step-1");
const step2_items = dataviz2.selectAll(".step-5");
const step3_items = dataviz3.selectAll(".step-10");
const step4_items = dataviz3.selectAll(".step-15");
const diag = dataviz3.select("#viz3_svg");
const article = scrolly.select("article");
const step = article.selectAll(".step");
const scroller = scrollama();
let third_viz_done = false;

function handleResize() {
    var stepH = Math.floor(window.innerHeight * 0.75);
    step.style("height", stepH + "px");
    var figureHeight = window.innerHeight / 1.3;
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
    } else if (response.index === 13){
        aller_plus_loin_viz3();
    } else if (response.index === 14){
        transition_viz3();
    } else if (response.index === 15){
        presentation_viz4();
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

create_first_viz("#viz1_svg", "https://komann12.github.io/Scrollytelling_indicateurs_environnement/data/viz_1/ER.H2O.INTR.PC.json");

create_second_viz("#viz2_svg", "https://komann12.github.io/Scrollytelling_indicateurs_environnement/data/viz_2/ER.H2O.INTR.K3.json");

create_third_viz("#viz3_svg");



/* GENERAL */

document.getElementById("bet-button").addEventListener("click", () => {
    window.location.href = "#presentation_viz1";
});

// Time
var dataTime = d3.range(0, 11).map(function(d) {
    return new Date(2005 + d, 10, 3);
});

var sliderTime = d3
    .sliderBottom()
    .min(d3.min(dataTime))
    .max(d3.max(dataTime))
    .step(1000 * 60 * 60 * 24 * 365)
    .width(300)
    .tickFormat(d3.timeFormat('%Y'))
    .tickValues(dataTime)
    .default(new Date(1998, 10, 3))
    .on('onchange', val => {
        d3.select('p#value-time').text(d3.timeFormat('%Y')(val));
        year = d3.timeFormat('%Y')(val);
        file = "https://komann12.github.io/Scrollytelling_indicateurs_environnement/data/viz_4/emissions_import_"+ year +".csv";
        create_fourth_viz("#viz4_svg", file);
    });

var gTime = d3
    .select('div#slider-time')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

gTime.call(sliderTime);

d3.select('p#value-time').text(d3.timeFormat('%Y')(sliderTime.value()));

create_fourth_viz("#viz4_svg", "https://komann12.github.io/Scrollytelling_indicateurs_environnement/data/viz_4/emissions_import_2005.csv");
