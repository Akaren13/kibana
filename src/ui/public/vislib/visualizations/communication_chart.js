import d3 from 'd3';
import _ from 'lodash';
import $ from 'jquery';
import errors from 'ui/errors';
import VislibVisualizationsChartProvider from './_chart';
export default function  CommChartFactory(Private) {
    const Chart = Private(VislibVisualizationsChartProvider);

    /**
     * Communication chart visualization
     *
     * @class CommChart
     * @constructor
     * @extends Chart
     * @param handler {Object} Reference to the Handler Class Constructor
     * @param el {HTMLElement} HTML element to which the chart will be appended
     * @param chartData {Object} Elasticsearch query results for this specific
     * chart
     */
    class CommChart extends Chart {
	
		
	 constructor(handler, chartEl, chartData) {
      super(handler, chartEl, chartData);
		 console.log("construct");
		 
		 const charts = this.handler.data.getVisData();
		 this.nodes = new Array();
		 this.links = new Array();
		 this.ip = new Array();
	 this.links = this._dataTransform(chartData, this.nodes, this.links, this.ip);
		
    }
		
		
		 /**
       * Create menu
       */
		/*
	function createMenu(){
      if(document.getElementById("ipNames") == null){
        // append options
        var myDiv = document.getElementsByClassName("vis-editor-agg-group buckets")[0];
        if(myDiv){
        var label = document.createElement("br");
        myDiv.appendChild(label);

        label = document.createElement("labell");
        label.id = "labelInfo";
        label.appendChild(document.createTextNode('Hide information '));

        myDiv.appendChild(label);

        var selectList = document.createElement("input");
        selectList.type= "checkbox";
        selectList.id= "ipNames";
        selectList.class= "ipNames";
        selectList.checked = true;
        selectList.onclick = function () {
          if(document.getElementById('ipNames').checked){
            var x = document.getElementsByClassName("nodetext");
            var i;
            for (i = 0; i < x.length; i++) {
              x[i].style.opacity = 0;
            }

          }

          else {
            var x = document.getElementsByClassName("nodetext");
            var i;
            for (i = 0; i < x.length; i++) {
              x[i].style.opacity = 2;
            }
          }
        };

        myDiv.appendChild(selectList);

        }
      }
	};
*/
		
		 /**
       * Data transform
       */
		
     _dataTransform(charts, nodes, links, ip) {
 		const series = this.chartData.series;
				 
          var k =0;
		  var i =0;
		 
 		console.log( " start"); 
		 console.log(series + " data"); 
		 console.log(series.length + " delka");
			//get indexes to links and nodes
          for(i=0; i< series.length ; i++)
          {

			 
			 //  series.forEach(function (obj) {
			console.log(i + " delka obj");
			console.log(series[i].values[0].y  + " pocet");
			console.log(series[i].label  + " label");
			console.log(series[i].values[0].x  + " xko");

// obj.values[0].y   = count
// obj.values[0].x   = druhy
// obj.label   = prvni				   

				   //if new source
            if(this.ip.indexOf(series[i].values[0].x) == -1)
            {
              this.ip.push(series[i].values[0].x);
              this.nodes.push(  
				  { ip: series[i].values[0].x, 
				   value: series[i].values[0].y, 
				   id: k });
				k++; 
              
            }
            else
            {
              var index = this.ip.indexOf(series[i].values[0].x);
              var num = this.nodes[index].value;
              this.nodes[index].value = num + series[i].values[0].y;
            }
			 
				   //if new target
            if(this.ip.indexOf(series[i].label) == -1)
            {
              this.ip.push(series[i].label);
              this.nodes.push(  { 
				  ip: series[i].label,
				  value:  series[i].values[0].y, 
				  id: k  });
				k++; 
              
            }
            else
            {
              var index = this.ip.indexOf(series[i].label);
              var num = series[i].values[0].y;
              this.nodes[index].y = num + series[i].values[0].y;
            }
       
			  //create associate array for links
             this.links.push(  
				 {source: this.ip.indexOf(series[i].values[0].x), 
				  target: this.ip.indexOf(series[i].label), 
				  value:  series[i].values[0].y});
			
 //}, this);
			  
		 
		}
		 /*
		 console.log( " *********************" );
		 for(var k = 0; k < this.nodes.length; k++)
			 {
				 
		console.log(this.nodes[k].value + " weight Node" );
	    console.log(this.nodes[k].ip + " ip node" );
		console.log(this.nodes[k].id + " id node" );
				 console.log( " *********************" );
			 }
		 for(var k = 0; k < this.links.length; k++)
			 {
				 
		console.log(this.links[k].source + " source link" );
		console.log(this.links[k].target + " target link" );
        console.log(this.links[k].value + " weight link" );
				 console.log( " *********************" );
		
			 }
			 */
		 return this.links;
};
		 		 
          
		/**
     * Adds links to SVG
     *
     * @method addlinks
     */
		 
    addLinks(svg, force) {	
      var c20 = d3.scale.category20();	
      const link = svg.selectAll('link')
                .data(this.links)
                .enter()
                .append('svg:line')
                .attr('class', 'link')
                .attr("x1", function(d) { return  d.source.x; })
                .attr("y1", function(d) { return  d.source.y; })
                .attr("x2", function(d) { return  d.target.x; })
                .attr("y2", function(d) { return  d.target.y; })
             /*   .on("mouseover", function(d) {
                  divLink.transition()
                          .duration(200)
                          .style("opacity", .9);
                  divLink	.html("Size: " + d.value )
                          .style("left", (d3.event.pageX) + "px")
                          .style("top", (d3.event.pageY - 28) + "px");
                    }
                )
                .on("mouseout", function(d) {
                  divLink.transition()
                      .duration(500)
                      .style("opacity", 0);
                })*/
                .style("stroke-width", 2);
		
		force.on("tick", tick); 
		
		  function tick() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
			  
		  };

		//console.log(link.length + " uvnitr length link");
		//console.log(link[0].length + " uvnitr length link0");
		//console.log( link + " uvnitr link");

		

		
		return link[0];
		
	};
		  
		  
	/**
     * Adds nodes to SVG
     *
     * @method addNodes
     * @param svg {HTMLElement} Chart SVG
     * @returns {D3.Selection} SVG with paths attached
     */
		 
	  addNodes(svg, force) {
      var c20 = d3.scale.category20();	  
            var node_drag = d3.behavior.drag()
                .on("dragstart", dragstart)
                .on("drag", dragmove)
                .on("dragend", dragend);

            function dragstart(d, i) {
              force.stop()
            }

            function dragmove(d, i) {
              d.px += d3.event.dx;
              d.py += d3.event.dy;
              d.x += d3.event.dx;
              d.y += d3.event.dy;
              tick();
            }

            function dragend(d, i) {
              d.fixed = true;
              tick();
            }
/*
 for(var k = 0; k < this.nodes.length; k++)
			 {
				 
		console.log(this.nodes[k].value + " weight Node" );
	    console.log(this.nodes[k].ip + " ip node" );
		console.log(this.nodes[k].id + " id node" );
				 console.log( " /////////////////////" );
			 }
         */   
             //Add nodes
            var node = svg.selectAll('node')
                .data(this.nodes)
                .enter()
                .append('circle')
                .attr('class', 'node')
			     .style("opacity", .9)
                .attr("r", function(d) { return 10; })
                .attr("id", function(d) { return d.id; })
			    .attr("cy", function(d){return d.y;})
                .attr("cx", function(d){return d.x;})
                .style("fill",  function(d) { return c20(d.value);})
               .on("mouseover", function(d) {
                  div.transition()
                      .duration(200)
                      .style("opacity", .9);
                  div .html("Field value: " + d.ip + "</br> Size: " + d.value )
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY - 28) + "px");
                }
                    )
                .on("mouseout", function(d) {
                  div.transition()
                      .duration(500)
                      .style("opacity", 0);
                })
                .call(node_drag);


            var n =  svg.selectAll('node')
                .data(this.nodes)
                .enter().append("text")
                .attr("dy", function(d){return -16})
                .attr("dx", function(d){return -37})
                .attr("class", "nodetext")
                .text(function(d){return d.ip});

            var div = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);
            var divLink = d3.select("body").append("div")
                .attr("class", "tooltipLink")
                .style("opacity", 0);

            force.on("tick", tick);

			//  node.on("mouseenter",fade(.3));
			//  node.on("mouseleave", fade(1));

           function tick() {
			   
            node.attr("transform", function(d) {
				return "translate(" + d.x + "," + d.y + ")"; });
              n.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
			   
          };
		        
             // Create legend
             

             var legend = d3.select('svg')
             .append("g")
             .attr("class", "legenda")
             .selectAll("g")
             .data(c20.domain())
             .enter()
             .append('g')
             .attr('class', 'legend')
             .attr('transform', function(d, i) {
             var height = 27;
             var x = 1;
             var y = i * height +5;
             return 'translate(' + x + ',' + y + ')';
             });


             legend.append('rect')
             .attr('width', 25)
             .attr('height',25)
             .style('fill', c20)
             .style('stroke', c20);

             legend.append('text')
             .attr("class", "textLegenda")
             .attr('y', 25 -21 + 13)
             .attr('x', 25 + 10)
             .text(function(d) { return d; });

         /*   
	 this.links.forEach(function(d) {
		  linkedByIndex[d.source.index + "," + d.target.index] = 1;
		});

		function isConnected(a, b) {
		  return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
		}
*/
            
             // Fade links and nodes
           /* 
            function fade(opacity) {
              return function(d) {
                node.style("stroke-opacity", function(o) {
                  thisOpacity = link.isConnected(d, o) ? 1 : opacity;
                  this.setAttribute('fill-opacity', thisOpacity);
                  return thisOpacity;
                });
                force.stop();
               
              };

            }
	*/
           return node[0];
		 
	  };
					   
		
		   /**
     * Renders d3 visualization
     *
     * @method draw
     * @returns {Function} Creates the comm chart
     */
    draw() {
      const self = this;
	  var margin = this._attr.margin;
      var minWidth = 20;
      var minHeight = 20;

      return function (selection) {
        selection.each(function (data) {
          const div = d3.select(this);
          const width = $(this).width();
          const height = $(this).height();

          // Create the canvas for the visualization
          const svg = div.append('svg')
              .attr('width', width)
              .attr('height', height + margin.top + margin.bottom)
              .append('g')
              .attr('transform', 'translate(0,' + margin.top + ')');

			
	    var force = d3.layout.force();
	/*	
 	this.links.forEach(function(d) {
    d.source = this.nodes[d.source];
    d.target = this.nodes[d.target];
  });
		*/
	 
		const linksFinal = self.addLinks(svg, force);
		const nodesFinal = self.addNodes(svg, force);
			
	
console.log("final");
	console.log(linksFinal.length + "  delka linku");
	console.log(nodesFinal.length + "  delka nodu");
	         
	
      	linksFinal.forEach(function(link, index, list) {
        if (typeof nodesFinal[link.source] === 'undefined') {
            console.log('undefined source', link);
        }
        if (typeof linksFinal[link.target] === 'undefined') {
            console.log('undefined target', link);
        }
    });

		
			
	 force.nodes(this.nodes)
            .links(this.links)
		    .size([width-70, height+70])
            .charge(-150)
            .linkDistance(80)
	    	//.on("tick", tick)
            .start();
			
	 self.events.emit('rendered', {
            chart: data
          });
			
         /*
	 force.on("tick", function() {
    this.links.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
        
    this.nodes.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  		});
			*/
          return svg;
        });
		
      };
	};
 } 
    return CommChart;

}; 
