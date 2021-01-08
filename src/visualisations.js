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
        france_data_original = data["Monde"]
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
            .domain([0,d3.max(france_data_original, d => d.value)])
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
        .attr("height", (d) => yScale(d))
        .attr("fill", "#6e8b3d");

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

/* VISU 4 */

function create_fourth_viz(viz, data_csv){
    const width = 800, height = 800;

    const projection = d3.geoOrthographic()
        .scale(150)
        .translate([width / 3, height / 5])
        .clipAngle(90) // without this options countries on the other side are visible
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
        .datum(graticule)
        .attr("class", "graticule")
        .attr("d", path);

    d3.json("data/viz_4/world-countries.json").then(function(collection) {
        var countries = svg.selectAll("path")
            .data(collection.features)
            .enter().append("path")
            .attr("d", path)
            .attr("class", "country")
            .attr("id", d => d.id)
            .on("mousemove", (event, d) => {
                document.getElementById("explain-pays").innerText = d.properties.name + ": "
                    + d.properties.value + " millions de Tonnes";
            })
            .on("mouseout", (event, d) => {

            });

        d3.csv(data_csv).then(function(data) {
            // 60 is the number of class in color_viz4.css
            var quantile = d3.scaleQuantile().domain([0, 900])
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
                .domain([0, 900])
                .range([0, 60 * 5]);

            svg.append("g")
                .attr('transform', 'translate(25, 10)')
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