import React from "react";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Typography,
} from "@mui/material";
import Carousel from "better-react-carousel";
import "../../assets/css/Home.scss";
//import { useSelector } from "react-redux";

function BoxTodos({ homeTodos, widthContent }) {
  //const homeTodos = useSelector((state) => state?.home.homeTodos);
  const BreakpointCarousel = () => {
    if (widthContent > 900) {
      return 3;
    } else if (widthContent > 700) {
      return 2;
    }
  };

  const HideArrowCarousel = () => {
    if (widthContent > 900 && homeTodos.length < 4) {
      return true;
    } else if (widthContent > 700 && homeTodos.length < 3) {
      return true;
    }
    return false;
  };
  return (
    <Carousel
      cols={BreakpointCarousel()}
      rows={1}
      gap={10}
      hideArrow={HideArrowCarousel()}
      loop
    >
      {homeTodos.map((todo, idx) =>
        todo ? (
          <Carousel.Item key={idx}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <CardHeader
                title={
                  <Typography className="carousel-title-todo">
                    {todo.summary}
                  </Typography>
                }
              />
              <CardContent>
                {todo.todos.map((t, idx) =>
                  t && idx < 3 ? (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                      key={t._id}
                    >
                      <Checkbox checked={t.isCompleted} />
                      <Typography>{t.todo}</Typography>
                    </Box>
                  ) : null
                )}
              </CardContent>
              {/* <CardActions>
                <Button>Xem thêm</Button>
              </CardActions> */}
            </Card>
          </Carousel.Item>
        ) : null
      )}
    </Carousel>
  );
}

export default BoxTodos;
