var width = 500,
    height = 250,
    margin = {left: 50, top: 30, right: 20, bottom:20},
    g_width = width - margin.left - margin.right,
    g_height = height - margin.top - margin.bottom;

// svg
var svg = d3.select("#container")
.append("svg:svg")  // .append("svg")
//width, height
.attr("width", 500) //attribute
.attr("height",250)

// 添加g元素
var g = d3.select("svg") // 选择符合匹配条件的第一个元素，selectAll选择所有符合条件的
.append("g")
.attr("transform","translate(" + margin.left + "," + margin.top + ")")


var data = [1,3,5,7,8,4,3,7]
// 缩放x
var scale_x = d3.scale.linear()
// x输入
.domain([0,data.length-1])
// x输出
.range([0,g_width])
// 缩放y
var scale_y = d3.scale.linear()
.domain([0,d3.max(data)])
.range([g_height,0]) // y轴反转



var line_generator = d3.svg.line()
.x(function(d, i){
    return scale_x(i);
}) //0,1,2,3..
.y(function(d)
{
    return scale_y(d);
}) //1,3,5...
.interpolate("cardinal")

// bost.ocks.org/mike/circles
// bost.ocks.org/mike/selection
g // 特定g对象
.append("path")
.attr("d",line_generator(data)) //d="M1,0L20,40L40,50L100,100L0,200"；d 是 path datas 的缩写

var x_axis = d3.svg.axis().scale(scale_x),
    y_aixs = d3.svg.axis().scale(scale_y).orient("left");

g.append("g")
.call(x_axis)
.attr("transform","translate(0,"+ g_height+")");

g.append("g")
.call(y_aixs)
.append("text")
.text("Price($)")
.attr("transform","rotate(-90)")
.attr("text-anchor","end") // 逆时针旋转90
.attr("dy","1em") // 沿y轴平移