// 跨域，d3文档显示需要启动服务器解决
// python -m http.server 8888 &
// csv的c是comma的缩写，里面的数据用逗号隔开
d3.csv("data.csv", type, function(data){
    console.log(data);


    var width = 400,
        height = 400;

    var svg = d3.select("#container")
                .append("svg")
                .attr("width",width)
                .attr("height",height);

    var g = svg.append("g")
    .attr("transform","translate(200, 200)");
       
    var arc_generator = d3.svg.arc()
    .innerRadius(100)
    .outerRadius(200)
   
    var angle_data = d3.layout.pie()
                       .value(function(d){return d.population;});
    
    console.log(angle_data(data));

    var color = d3.scale.category10();

    g.selectAll("path")
     .data(angle_data(data))
     .enter()
     .append("path")
     .attr("d", arc_generator)
     .style("fill",function(d,i){return color(i);});

     g.selectAll("text")
     .data(angle_data(data))
     .enter()
     .append("text")
     .text(function(d){return d.data.education;})
     .attr("transform",function(d){return "translate("+arc_generator.centroid(d)+")";}) // 文字定位
     .attr("text-anchor","middle"); // 中心对齐
});

function type(d){
    d.population = +d.population; // 加号可以转换字符串为数字！！！
    return d
}

// nvd3
// xCharts