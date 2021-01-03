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
    } else if (response.index === 4){
        dataviz1.classed("invisible", true);
    } else if (response.index === 5){
        dataviz2.classed("invisible", false);
        step2_items.classed("invisible", true);
    } else if (response.index === 6) {
        step2_items.classed("invisible", false);
        document.getElementById("curscore-span2").innerText = `Votre score actuel : ${current_score}`
    } else if (response.index === 7){
        document.getElementById("explain-span2").innerText = "Et... en fait les ressources en eau douce " +
            "renouvelable sont restés les mêmes entre 1985 et 2014 !";
        const svg = d3.select("#viz2_svg")
        draw_second_viz(svg, france_data_original2);
        if (second_viz_done === false) {
            let bet_val = document.getElementById("bet-select2").value
            if(bet_val === "same") {
                current_score += 1;
            } else {
                current_score -= 1;
            }
            document.getElementById("curscore-span2").innerText = `Votre score actuel : ${current_score}`
            second_viz_done = true;
        }
    } else if (response.index === 9){
        dataviz1.classed("invisible", true);
        dataviz2.classed("invisible", true);
        diag.classed("invisible", true);
    } else if (response.index === 10){
        dataviz3.classed("invisible", false);
        step3_items.classed("invisible", true);
    } else if (response.index === 11) {
        step3_items.classed("invisible", false);
        document.getElementById("curscore-span3").innerText = `Votre score actuel : ${current_score}`
    } else if (response.index === 12){
        diag.classed("invisible", false);
        document.getElementById("explain-span3").innerText = "La surface de forêt " +
            "disparue entre 1985 et 2016 est de 1 324 449 km2. Donc la réponse la plus proche c'est la france";
        const svg = d3.select("#viz3_svg")
        if (third_viz_done === false) {
            let bet_val = document.getElementById("france").checked
            if(bet_val === true) {
                current_score += 1;
            } else {
                current_score -= 1;
            }
            document.getElementById("curscore-span3").innerText = `Votre score actuel : ${current_score}`
            third_viz_done = true;
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

function create_first_viz(viz, data_json) {
    const width = 700;
    const height = 350;
    const padding = 40;

    const svg = d3
        .select(viz)
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`);

    d3.json(data_json).then(function (data) {
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

/* VISU 2*/

let france_data_original2 = []
let france_data2 = []
let second_viz_xScale;
let second_viz_yScale;
let second_viz_done = false;

function draw_second_viz(viz_svg, new_data) {
    let line = viz_svg.append("path")
        .datum(new_data)
        .attr("fill", "none")
        .attr("stroke", "#02aded")
        .attr("stroke-width", 5)
        .attr("d", d3.line()
            .x(d => second_viz_xScale(d.year))
            .y(d => second_viz_yScale(d.value))
        )

    line.exit()
        .remove();
}

function create_second_viz(viz, data_json) {
    const width = 700;
    const height = 350;
    const padding = 40;

    const svg = d3
        .select(viz)
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`);

    d3.json(data_json).then(function (data) {
        france_data_original2 = data["France"]
        let france_data_1 = [];
        const years_count = france_data_original2.length;
        for (let i = 0; i < years_count; i++) {
            if (i < years_count / 2) {
                france_data_1.push(france_data_original2[i]);
            }
        }
        france_data2 = france_data_1;

        second_viz_xScale = d3.scaleLinear()
            .domain(d3.extent(france_data_original2, d => d.year))
            .range([padding, width - padding]);
        let xAxis = d3.axisBottom(second_viz_xScale)
            .tickFormat(d3.format("d"));
        second_viz_yScale = d3.scaleLinear()
            .domain(d3.extent(france_data_original2, d => d.value))
            .range([height - padding, padding]);
        let yAxis = d3.axisLeft(second_viz_yScale)
            .tickFormat(d3.format("d"));

        svg.append("g")
            .attr("transform", `translate(0, ${height - padding})`)
            .call(xAxis);
        svg.append("g")
            .attr("transform", `translate(${padding}, 0)`)
            .call(yAxis);

        draw_second_viz(svg, france_data_1);

    });
}

/*VISU 3*/

function create_third_viz(viz) {
        var surfaceParis = 105;
        var surfaceLondre = 1572;
        var surfacePekin = 16410;
        var surfaceFrance = 643801;
        var surfaceTotale = 1324449;//data[1990][34822] - data[2016][34822];
        var superficies = [
          ["Paris", "Londre", "Pekin", "France", "Forêts"],
          [
            surfaceParis,
            surfaceLondre,
            surfacePekin,
            surfaceFrance,
            surfaceTotale
          ]
        ];

        const width = 500;
        const height = 120;
        const padding = 40;

        var xScale = d3
          .scaleLinear()
          .domain([0, superficies[1].length])
          .range([0, width]);

        var yScale = d3
          .scaleLinear()
          .domain([0, d3.max(superficies[1])])
          .range([0, height]);

        var svg = d3
          .select("#viz3_svg")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .style("background-color", "lightgrey")
          .attr("display", "none");

        svg
          .selectAll(".bar")
          .data(superficies[1])
          .enter()
          .append("rect")
          .attr("x", (d, i) => xScale(i))
          .attr("y", (d) => height - yScale(d))
          .attr("width", xScale(0.9))
          .attr("height", (d) => yScale(d));

        svg
          .selectAll("text")
          .data(superficies[0])
          .enter()
          .append("text")
          .attr("x", (d, i) => xScale(i) + 17)
          .attr("y", (d) => height - 5)
          .text(function (d) {
            return d;
          })
          .style("fill", "blue");
      ;
}

create_first_viz("#viz1_svg", "https://komann12.github.io/Scrollytelling_indicateurs_environnement/data/ER.H2O.INTR.PC.json");

create_second_viz("#viz2_svg", "https://komann12.github.io/Scrollytelling_indicateurs_environnement/data/ER.H2O.INTR.K3.json");

create_third_viz("#viz3_svg");

/* GENERAL */


document.getElementById("bet-button").addEventListener("click", () => {
    window.scroll({
        top: 0.8 * window.innerHeight,
        behavior: 'smooth'
    });
});
