import React, { Fragment, useEffect, useState } from "react";

import { Typography } from "@mui/material";
import Carousel from "better-react-carousel";

import * as CustomComponent from "../../component/custom/CustomComponents";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

function BoxGroup() {
  // const navigate = useNavigate();
  const homeGroup = useSelector((state) => state?.home.homeGroup);

  const [widthContent, setWidthContent] = useState(window.innerWidth);

  const handleChooseGroup = (e, id) => {
    //navigate(`/group?groupId=${id}&Id=0`);
  };

  const BreakpointCarousel = () => {
    if (widthContent > 900) {
      return 3;
    } else if (widthContent > 700) {
      return 2;
    }
  };

  const HideArrowCarousel = () => {
    if (widthContent > 900 && homeGroup.length < 4) {
      return true;
    } else if (widthContent > 700 && homeGroup.length < 3) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    function handleWindowResize() {
      setWidthContent(window.innerWidth);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <Fragment>
      {homeGroup.length > 0 ? (
        <Fragment>
          {/* <Typography>Nhóm của tôi</Typography> */}
          <Carousel
            cols={BreakpointCarousel()}
            rows={1}
            gap={10}
            hideArrow={HideArrowCarousel()}
            loop
          >
            {homeGroup.map((gr, idx) =>
              gr ? (
                <Carousel.Item key={gr._id}>
                  <CustomComponent.ImageButtonBoxGroup
                    focusRipple
                    style={{
                      width: "100%",
                    }}
                    onClick={(e) => handleChooseGroup(e, gr._id)}
                  >
                    <CustomComponent.ImageSrcBoxGroup
                      style={{ backgroundImage: `url(${gr?.avatar})` }}
                    />
                    <CustomComponent.ImageBackdropBoxGroup className="MuiImageBackdrop-root" />
                    <CustomComponent.ImageBoxGroup>
                      <Typography
                        component="span"
                        variant="subtitle1"
                        color="inherit"
                        sx={{
                          position: "relative",
                          p: 4,
                          pt: 2,
                          pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                        }}
                      >
                        {gr?.name}
                        <CustomComponent.ImageMarkedBoxGroup className="MuiImageMarked-root" />
                      </Typography>
                    </CustomComponent.ImageBoxGroup>
                  </CustomComponent.ImageButtonBoxGroup>
                </Carousel.Item>
              ) : null
            )}
          </Carousel>
        </Fragment>
      ) : null}
    </Fragment>
  );
}

export default BoxGroup;
