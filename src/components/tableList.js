import React, { useEffect, useState, useRef } from "react";
import { FormattedDate, FormattedMessage } from "react-intl";
import CardDetail from "./cardDetail";
import * as d3 from "d3";

const TablesList = () => {
  const urlEn =
    "https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/e2d16f7440d51cae06a9daf37b0b66818dd1fe31/series-en.json";
  const urlEs =
    "https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/a467415350e87c13faf9c8e843ea2fd20df056f3/series-es.json";
  const [state, setstate] = useState({ series: [] });
  const [selected, setSelected] = useState();

  const canvas = useRef();

  //Para d3 se uso la siguiente libreria https://www.d3-graph-gallery.com/graph/scatter_basic.html como base, es muy simple, de ahi se construye

  const scatterPlot = (data) => {
    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select(canvas.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    var x = d3
      .scaleLinear()
      .domain([
        0,
        1.15 *
          Math.max.apply(
            Math,
            data.series.map((i) => {
              return i.episodes;
            })
          ),
      ])
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3
      .scaleLinear()
      .domain([
        0,
        1.15 *
          Math.max.apply(
            Math,
            data.series.map((i) => {
              return i.seasons;
            })
          ),
      ])
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Add dots
   
   
   var node= svg
      .append("g")
      .selectAll("dot")
      .data(data.series)
      .enter()
      .append("g");
      node
      .append("circle")
      .attr("cx", function (d) {
        return x(d.episodes);
      })
      .attr("cy", function (d) {
        return y(d.seasons);
      })
      .attr("r", 6)
      .style("fill", "orange");
      node.append("text")
      .attr("x", function (d) {
        return x(d.episodes);
      })
      .attr("y", function (d) {
        return y(d.seasons);
      })
      .text(function (d) {
        return d.name;
      });
      svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height-6)
      .text((window.navigator.language.startsWith("en")) ? "Episodes" : "Episodios");

      svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text((window.navigator.language.startsWith("en")) ? "Seasons" : "Temporadas");
    
  };
  useEffect(() => {
    let url = window.navigator.language.startsWith("es") ? urlEs : urlEn;
    fetch(url)
      .then((ans) => ans.json())
      .then((ans) => {
        console.log(ans);
        if (!navigator.onLine) {
          let i = localStorage.getItem("series");
          if (i !== null) {
            setstate({ ...state, series: i });
            console.log({ ...state, series: i });
            scatterPlot({ ...state, series: i });
          }
        } else {
          setstate({ ...state, series: ans });
          localStorage.setItem("series", ans);
          console.log({ ...state, series: ans });
          scatterPlot({ ...state, series: ans });
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const createCard = () => {
    if (selected) {
      return <CardDetail info={selected} />;
    }
  };

  const switcharoo = (e) => {
    let change = new Promise((resolve, reject) => {
      setSelected(null);
      resolve(e);
    });
    change.then((ans) => setSelected(ans));
  };

  const produce = () => {
    if (state.series.length === 0) {
      return (
        <div>
          <h1>
            <FormattedMessage id="Studio is busy!" />
          </h1>
        </div>
      );
    } else {
      return (
        <div className="container-fluid">
          <div className="row">
            <h1>
              <FormattedMessage id="TV Series" />
            </h1>
          </div>
          <div className="row">
            <div className="col-8">
              <table className="table table-striped table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">
                      <FormattedMessage id="id" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="Name" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="Channel" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="Seasons" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="Episodes" />
                    </th>
                    <th scope="col">
                      <FormattedMessage id="Release" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {state.series.map((e) => (
                    <tr
                      onClick={() =>
                        !selected || selected.id !== e.id
                          ? switcharoo(e)
                          : setSelected(null)
                      }
                    >
                      <th scope="row">{e.id}</th>
                      <td>{e.name}</td>
                      <td>{e.channel}</td>
                      <td>{e.seasons}</td>
                      <td>{e.episodes}</td>
                      <td>
                        <FormattedDate
                          value={
                            new Date(
                              e.release.split("/")[2],
                              e.release.split("/")[1],
                              e.release.split("/")[0]
                            )
                          }
                          month="numeric"
                          month="long"
                          day="numeric"
                          weekday="long"
                          year="numeric"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-4">{createCard()}</div>
          </div>
          <div className="row">
            <div ref={canvas}></div>
          </div>
        </div>
      );
    }
  };

  return <div>{produce()}</div>;
};

export default TablesList;
