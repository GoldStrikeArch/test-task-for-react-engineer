import { DEFAULT_FILTERS } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/store";
import { Filters, setFilters } from "@/store/searchSlice";

import { Col, Row, Select, Slider } from "antd";
import Title from "antd/es/typography/Title";

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
    <div>
      <Col style={{ marginRight: "25%" }}>
        <Title level={3}>Filters</Title>
        <p>Eye color</p>
        <Select
          value={eyeColor}
          options={EYE_COLORS.map((x) => ({ value: x, label: x }))}
          onChange={handleChangeEyeColor}
        />
        <p>Height</p>
        <Slider
          style={{ maxWidth: "33%" }}
          range={{ draggableTrack: true }}
          max={DEFAULT_FILTERS.height[1]}
          defaultValue={DEFAULT_FILTERS.height}
          onChange={handleChangeHeight}
        />
        <p>Mass</p>
        <Slider
          style={{ maxWidth: "33%" }}
          range={{ draggableTrack: true }}
          defaultValue={DEFAULT_FILTERS.mass}
          max={DEFAULT_FILTERS.mass[1]}
          onChange={handleChangeMass}
        />
      </Col>
    </div>
  );
};
