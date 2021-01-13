/* VISU EAU */

let monde_data_original = []
let monde_data = []
let first_viz_xScale;
let first_viz_yScale;

function draw_first_viz(first_viz_svg, new_data) {
    let line = first_viz_svg.append("path")
        .datum(new_data)
        .attr("fill", "none")
        .attr("stroke", "#40CAFC")
        .attr("stroke-width", 5)
        .attr("d", d3.line()
            .x(d => first_viz_xScale(d.year))
            .y(d => first_viz_yScale(d.value))
        )

    line.exit()
        .remove();
}

function create_first_viz(viz, data_json) {
    const width = 600;
    const height = 300;
    const padding = 40;

    const svg = d3
        .select(viz)
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`);

    d3.json(data_json).then(function (data) {
        monde_data_original = data["Monde"]
        let monde_data_1 = [];
        const years_count = monde_data_original.length;
        for (let i = 0; i < years_count; i++) {
            if (i < years_count / 2) {
                monde_data_1.push(monde_data_original[i]);
            }
        }
        monde_data = monde_data_1;


        first_viz_xScale = d3.scaleLinear()
            .domain(d3.extent(monde_data_original, d => d.year))
            .range([padding, width - padding]);
        let xAxis = d3.axisBottom(first_viz_xScale)
            .tickFormat(d3.format("d"));
        first_viz_yScale = d3.scaleLinear()
            .domain([0, 1.5*d3.max(monde_data_original, d => d.value)])
            .range([height - padding, padding]);
        let yAxis = d3.axisLeft(first_viz_yScale)
            .tickFormat(d3.format("d"));

        svg.append("g")
            .attr("transform", `translate(0, ${height - padding})`)
            .call(xAxis);
        svg.append("g")
            .attr("transform", `translate(${padding}, 0)`)
            .call(yAxis);

        draw_first_viz(svg, monde_data_1);

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
    const width = 600;
    const height = 300;
    const padding = 40;

    const svg = d3
        .select(viz)
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`);

    d3.json(data_json).then(function (data) {
        france_data_original2 = data["Monde"]
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
            .domain([0,d3.max(france_data_original2, d => d.value)])
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

let third_viz_done = false;

function create_third_viz(viz) {
    var surfaceParis = 105;
    var surfaceLondre = 1572;
    var surfacePekin = 16410;
    var surfaceFrance = 643801;
    var surfaceTotale = 1324449;//data[1990][34822] - data[2016][34822];
    var superficies = [
        ["Paris", "Londres", "Pekin", "France", "Forêts"],
        [
            surfaceParis,
            surfaceLondre,
            surfacePekin,
            surfaceFrance,
            surfaceTotale
        ]
    ];

    const width = 600;
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
        .attr("height", (d) => yScale(d))
        .attr("fill", "#424c1e");

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
        .style("fill", "#fff");
}

/* VISU 4 */

pays_prediction = "";

let fourth_viz_done = false;

function create_fourth_viz(viz, data_csv, scale){
    const width = 800, height = 400;

    const projection = d3.geoOrthographic()
        .scale(130)
        .translate([width / 3, height / 5])
        .clipAngle(90)
        .precision(.1)
        .rotate([0,0,0]);

    const path = d3.geoPath()
        .projection(projection);

    const svg = d3.select(viz)
        .attr("id", "world")
        .attr("width", width)
        .attr("height", height);

    // Append all meridians and parallels
    const graticule = d3.geoGraticule();
    svg.append("path")
        .attr('transform', 'translate(100, 100)')
        .datum(graticule)
        .attr("class", "graticule")
        .attr("d", path);

    d3.json("data/viz_4/world-countries.json").then(function(collection) {
        var countries = svg.selectAll("path")
            .data(collection.features)
            .enter()
            .append("path")
            .attr('transform', 'translate(100, 100)')
            .attr("d", path)
            .attr("class", "country")
            .attr("id", d => d.id)
            .on("mousemove", (event, d) => {

            })
            .on("mouseout", (event, d) => {

            })
            .on("click", (event, d) => {
                document.getElementById("explain-pays").innerText = d.properties.name + ": "
                    + d.properties.value + " millions de Tonnes";
                pays_prediction = d.properties.name;
            });

        d3.csv(data_csv).then(function(data) {
            // 60 is the number of class in color_viz4.css
            var quantile = d3.scaleQuantile().domain([0, scale])
                .range(d3.range(60));

            var legend = svg.append('g')
                .attr('transform', 'translate(35, 10)')
                .attr('id', 'legend');

            legend.selectAll('.colorbar')
                .data(d3.range(60))
                .enter().append('rect')
                .attr('y', d => d * 5 + 'px')
                .attr('height', '5px')
                .attr('width', '20px')
                .attr('x', '0px')
                .attr("class", d => "color-" + d);

            legendScale = d3.scaleLinear()
                .domain([0, scale])
                .range([0, 60 * 5]);

            svg.append("g")
                .attr('transform', 'translate(30, 10)')
                .attr('color', "#000")
                .call(d3.axisLeft(legendScale).ticks(10));

            data.forEach(function(e,i) {
                d3.select("#" + e.country)
                    .attr("class", d => "country color-" + quantile(+e.gaz));
            });

            for (var i = 0; i < data.length; i++) {
                //Nom du pays
                var dataCountry = data[i].country;
                //Valeur associee au pays
                var dataValue = parseInt(data[i].gaz);
                //Recherche du pays dans le GeoJSON
                for (var j = 0; j < collection.features.length; j++) {
                    var jsonCountry = collection.features[j].id;
                    if (dataCountry === jsonCountry) {
                        //On injecte la valeur du pays dans le json
                        collection.features[j].properties.value = dataValue;
                        break;
                    }
                }
            }
        });
    });

    const λ = d3.scaleLinear()
        .domain([0, width])
        .range([-180, 180]);

    const φ = d3.scaleLinear()
        .domain([0, height])
        .range([90, -90]);

    var drag = d3.drag().subject(function() {
        var r = projection.rotate();
        return {
            x: λ.invert(r[0]),
            y: φ.invert(r[1])
        };
    }).on("drag", function(event) {
        projection.rotate([λ(event.x), φ(event.y)]);

        svg.selectAll(".graticule")
            .datum(graticule)
            .attr("d", path);

        svg.selectAll(".country")
            .attr("d", path);
    });

    svg.call(drag);
}

/*VISU 5*/

let fifth_viz_done = false;

function create_fifth_viz(viz, data_json) {
    var tooltip = d3
        .select("#viz5_svg")
        .append("div")
        .attr("class", "hidden tooltip");

    d3.json(data_json).then(function (data) {
        //france_data_original = data["World"];
        //console.log(data["World"]);
        let world_data = [];
        //const years_count = france_data_original.length;
        for (let i = 1960, year = 1971; i < 2015; i++) {
            //console.log(data[i][257]);
            if (data[i][257] != null) {
                world_data.push([data[i][257], year++]);
            }
        }

        var color = d3
            .scaleQuantize()
            .range([
                "#ffffec",
                "#ffffe0",
                "#ffffd5",
                "#ffffca",
                "#ffffbf",
                "#ffffb4",
                "#ffffa8",
                "#ffff9d",
                "#ffff92",
                "#ffff87",
                "#ffff7b",
                "#ffff70",
                "#ffff65",
                "#ffff5a",
                "#ffff4f",
                "#ffff43",
                "#ffff38",
                "#ffff2d",
                "#ffff22",
                "#ffff16",
                "#ffff0b",
                "#ffff00",
                "#f4f400",
                "#e9e900",
                "#dddd00",
                "#d2d200",
                "#c7c700",
                "#bcbc00",
                "#b0b000",
                "#a5a500",
                "#9a9a00",
                "#8f8f00",
                "#848400",
                "#787800",
                "#6d6d00",
                "#626200",
                "#575700",
                "#4b4b00",
                "#404000",
                "#353500",
                "#2a2a00",
                "#1f1f00",
                "#131300",
                "#080800"
            ]);

        color.domain([world_data[0][0], world_data[43][0]]);

        var width = 800,
            height = 200;

        var xScale = d3
            .scaleLinear()
            .domain([0, world_data.length])
            .range([0, width]);

        var svg = d3
            .select("#viz5_svg")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("background-color", "lightgrey");

        svg
            .selectAll(".bar")
            .data(world_data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => xScale(i))
            .attr("y", 0)
            .attr("width", width)
            .attr("height", height)
            .style("fill", function (d) {
                return color(d[0]);
            })
            .on("mouseover", function (event, d) {
                document.getElementById("explain-elec").innerText = Math.round(d[0]) + " KWH en " + d[1];
            });
    });
}