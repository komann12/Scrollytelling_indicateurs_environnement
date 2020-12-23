/* SCROLLAMA */


const main = d3.select("main");
const scrolly = main.select("#scrolly");
const figure = scrolly.select("figure");
const step1_items = figure.selectAll(".step-1")
const article = scrolly.select("article");
const step = article.selectAll(".step");
const scroller = scrollama();

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

    if (response.index === 1) {
        step1_items.classed("invisible", false);
    } else if (response.index === 2) {
        document.getElementById("explain-span").innerText = "Et... patatra ! Les ressources en eau douce " +
            "renouvelable ont fortement diminue entre 1985 et 2014 !";
        const svg = d3.select("#viz1_svg")
        draw_first_viz(svg, france_data_original);
        if (first_viz_done === false) {
            let bet_val = document.getElementById("bet-select").value
            if(bet_val === "dec") {
                current_score += 1;
            } else {
                current_score -= 1;
            }
            document.getElementById("curscore-span").innerText = `Votre score actuel : ${current_score}`
            first_viz_done = true;
        }
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

/* VISU EAU */

let france_data_original = []
let france_data = []
let first_viz_xScale;
let first_viz_yScale;
let first_viz_done = false;

function draw_first_viz(first_viz_svg, new_data) {
    let line = first_viz_svg.append("path")
        .datum(new_data)
        .attr("fill", "none")
        .attr("stroke", "#02aded")
        .attr("stroke-width", 5)
        .attr("d", d3.line()
            .x(d => first_viz_xScale(d.year))
            .y(d => first_viz_yScale(d.value))
        )

    line.exit()
        .remove();
}

function create_first_viz() {
    const width = 700;
    const height = 350;
    const padding = 40;

    const svg = d3
        .select("#viz1_svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`);

    d3.json("https://komann12.github.io/Scrollytelling_indicateurs_environnement/data/ER.H2O.INTR.PC.json").then(function (data) {
        france_data_original = data["France"]
        let france_data_1 = [];
        const years_count = france_data_original.length;
        for (let i = 0; i < years_count; i++) {
            if (i < years_count / 2) {
                france_data_1.push(france_data_original[i]);
            }
        }
        france_data = france_data_1;


        first_viz_xScale = d3.scaleLinear()
            .domain(d3.extent(france_data_original, d => d.year))
            .range([padding, width - padding]);
        let xAxis = d3.axisBottom(first_viz_xScale)
            .tickFormat(d3.format("d"));
        first_viz_yScale = d3.scaleLinear()
            .domain(d3.extent(france_data_original, d => d.value))
            .range([height - padding, padding]);
        let yAxis = d3.axisLeft(first_viz_yScale)
            .tickFormat(d3.format("d"));

        svg.append("g")
            .attr("transform", `translate(0, ${height - padding})`)
            .call(xAxis);
        svg.append("g")
            .attr("transform", `translate(${padding}, 0)`)
            .call(yAxis);

        draw_first_viz(svg, france_data_1);

    });
}

create_first_viz();


/* GENERAL */


document.getElementById("bet-button").addEventListener("click", () => {
    window.scroll({
        top: 0.8 * window.innerHeight,
        behavior: 'smooth'
    });
});
