import React from "react";
import Tree from "react-d3-tree";
import orgChartJson from "./data/org-chart.json";
import { useCenteredTree } from "./helpers";
import "./styles.css";

const containerStyles = {
  width: "100vw",
  height: "100vh"
};

const renderCard = ({ nodeDatum, toggleNode, foreignObjectProps = {} }) => {
  const hasChildren = nodeDatum.children?.length;
  

  return (
    <React.Fragment>
      <foreignObject
        {...foreignObjectProps}
        width="200"
        height="500"
        x="-100"
        y="-10"
      >
        <div
          className={`card ${ nodeDatum.attributes.isDemandMet? "card--is-company" : ""} ${
            hasChildren ? "card--has-children" : ""
          }`}
        >
          
          <h2>{nodeDatum.name}</h2>
          <p>DESCRIPTION: {nodeDatum.attributes?.description}</p>
          <p>QTY REQ: {nodeDatum.attributes.qty}</p>
          <p>ON HAND: {nodeDatum.attributes.onHand}</p>


          {hasChildren? (
            <button className="toggle" type="button" onClick={toggleNode}>
              {nodeDatum.__rd3t.collapsed ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  stroke="none"
                  fill="currentcolor"
                >
                  <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  stroke="none"
                  fill="currentcolor"
                >
                  <path d="M0 10h24v4h-24z" />
                </svg>
              )}
            </button>
          ) : null}
        </div>
      </foreignObject>
    </React.Fragment>
  );
};

export default function App() {
  const handleClick = (text) => alert(text);
  const [dimensions, translate, containerRef] = useCenteredTree();
  const cardCoords = React.useRef({});


  return (
    <>
      {JSON.stringify(cardCoords)}
      <p className="colors">
        <span className="company">Company</span>{" "}
        <span className="clinic">Clinic</span>
      </p>
      <div style={containerStyles} ref={containerRef}>

        <Tree
          pathFunc="elbow"
          separation={{ siblings: 1.5, nonSiblings: 2 }}
          data={orgChartJson}
          dimensions={dimensions}
          translate={translate}
          orientation = "vertical"
   
          //initialDepth={0}
          centeringTransitionDuration={200}
          renderCustomNodeElement={(rd3tProps) =>
            renderCard({ ...rd3tProps, handleClick })
          }
          
        />
      </div>
    </>
  );
}
