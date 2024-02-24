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
        width="350"
        height="500"
        x="-100"
        y="-10"
      >
        <div
          className={`card ${nodeDatum.attributes.isComponentDemandMet?"componenet-demand-met":""} ${ nodeDatum.attributes.isDemandMet? "demand-met" : ""}     `}
        >
          <h2>{nodeDatum.name}</h2>
          <p className="desc">DESC: {nodeDatum.attributes?.description}</p>
          <p>QTY REQ: {nodeDatum.attributes.qty}</p>
          <p>ON HAND: {nodeDatum.attributes.onHand}</p>

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
      <div style={containerStyles} ref={containerRef}>
        <Tree
          nodeSize={{x: 200, y: 800
          }}
          
          pathFunc="beizer curve"
          separation={{ siblings: 3, nonSiblings: 6 }}
          data={orgChartJson}
          dimensions={dimensions}
          translate={translate}
          orientation = "vertical"
          centeringTransitionDuration={200}
          renderCustomNodeElement={(rd3tProps) =>
            renderCard({ ...rd3tProps, handleClick })
          }
        />
      </div>
    </>
  );
}
