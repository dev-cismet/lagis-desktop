import { FolderOpenOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import OverviewCard from "../ui/OverviewCard";
import "./style.css";
import { Link } from "react-router-dom";
import { buildUrlParams } from "../../core/tools/helper";
import { useEffect } from "react";
import { defaultLinksColor } from "../../core/tools/helper";
const mockExtractor = (input) => {
  return [
    { title: "104.2", color: "#0097FA", size: 250 },
    { title: "403.4", color: "#6254EA", size: 50 },
  ];
};
const DashboardOffices = ({
  dataIn,
  extractor = mockExtractor,
  parametersForLink,
  width = 231,
  height = 188,
  style,
}) => {
  let square = "20px";
  const data = extractor(dataIn);
  useEffect(() => {
    console.log("xxx data", data);
  }, []);

  return (
    <div className="dashboard-tile">
      {data.length > 0 && data[0] ? (
        <Link to={`/verwaltungsbereiche?${buildUrlParams(parametersForLink)}`}>
          <OverviewCard
            title="Verwaltungsbereiche"
            subtitle="& Rollen"
            icon={<FolderOpenOutlined style={{ color: "#0097FA" }} />}
          >
            <div className="flex flex-col mt-auto">
              {data?.map((item) => (
                <div className="flex justify-between items-center mt-1 mb-1">
                  <div className="flex justify-between items-center">
                    {item?.title && (
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          marginRight: "6px",
                          backgroundColor: item?.color || "#0097FA",
                        }}
                      ></span>
                    )}
                    <span
                      style={{
                        color: item?.color || defaultLinksColor,
                        fontSize: item?.title ? square : "88px",
                        marginBottom: item?.title ? "0px" : "-10px",
                      }}
                      className="font-bold text-medium"
                    >
                      {item?.title || "00"}
                    </span>
                  </div>
                  <span
                    style={{
                      color: "#6C6A6A",
                      fontSize: square,
                    }}
                    // className="font-lg"
                  >
                    {item?.size ? `${item?.size} m²` : ""}
                  </span>
                </div>
              ))}
            </div>
          </OverviewCard>
        </Link>
      ) : (
        <OverviewCard
          title="Verwaltungsbereiche"
          subtitle="& Rollen"
          icon={<FolderOpenOutlined style={{ color: "#0097FA" }} />}
        >
          <div className="flex flex-col mt-auto">
            {data?.map((item) => (
              <div className="flex justify-between items-center mt-1 mb-1">
                <div className="flex justify-between items-center">
                  {item?.title && (
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        marginRight: "6px",
                        backgroundColor: item?.color || "#0097FA",
                      }}
                    ></span>
                  )}
                  <span
                    style={{
                      color: item?.color || defaultLinksColor,
                      fontSize: item?.title ? square : "88px",
                      marginBottom: item?.title ? "0px" : "-10px",
                    }}
                    className="font-bold text-medium"
                  >
                    {item?.title || "00"}
                  </span>
                </div>
                <span
                  style={{
                    color: "#6C6A6A",
                    fontSize: square,
                  }}
                  // className="font-lg"
                >
                  {item?.size ? `${item?.size} m²` : ""}
                </span>
              </div>
            ))}
          </div>
        </OverviewCard>
      )}
    </div>
  );
};
export default DashboardOffices;

DashboardOffices.propTypes = {
  /**
   * The current main data object that is being used
   */
  dataIn: PropTypes.object,
  /**
   * The extractor function that is used to transform the dataIn object into the data object
   */
  extractor: PropTypes.func,
  /**
   * The width of the component
   * @default 300
   * @type number
   * @required false
   * @control input
   * @group size
   *
   **/
  width: PropTypes.number,

  /**
   * The height of the component
   *
   * @default 300
   * @type number
   * @required false
   * @control input
   *
   **/

  height: PropTypes.number,
};
