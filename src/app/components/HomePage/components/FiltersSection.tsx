import { DEFAULT_FILTERS } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/store";
import { Filters, setFilters } from "@/store/searchSlice";

import { Col, Row, Select, Slider } from "antd";

const EYE_COLORS = ["any", "green", "blue", "brown", "red", "yellow"];

export const FiltersSection = () => {
  const dispatch = useAppDispatch();
  const eyeColor = useAppSelector((state) => state.search.filters.eye_color);
  const mass = useAppSelector((state) => state.search.filters.mass);
  const height = useAppSelector((state) => state.search.filters.height);

  const handleChangeEyeColor = (val: Filters["eye_color"]) =>
    dispatch(setFilters({ eye_color: val, mass, height }));

  const handleChangeHeight = (newHeightRage: [number, number]) =>
    dispatch(setFilters({ mass, eye_color: eyeColor, height: newHeightRage }));

  const handleChangeMass = (newMassRange: [number, number]) =>
    dispatch(setFilters({ mass: newMassRange, eye_color: eyeColor, height }));

  return (
    <Row>
      <Col span={4}>
        <Select
          value={eyeColor}
          options={EYE_COLORS.map((x) => ({ value: x, label: x }))}
          onChange={handleChangeEyeColor}
        />
      </Col>
      <Col span={6}>
        <p>Height</p>
        <Slider
          range={{ draggableTrack: true }}
          max={DEFAULT_FILTERS.height[1]}
          defaultValue={DEFAULT_FILTERS.height}
          onChange={handleChangeHeight}
        />
      </Col>
      <Col span={6} style={{ marginLeft: "16px" }}>
        <p>Mass</p>
        <Slider
          range={{ draggableTrack: true }}
          defaultValue={DEFAULT_FILTERS.mass}
          max={DEFAULT_FILTERS.mass[1]}
          onChange={handleChangeMass}
        />
      </Col>
    </Row>
  );
};
