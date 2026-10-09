export const validationState = (frame: number) => {
  const corrected = frame >= 175;
  const raw = corrected ? {id: 7, age: 21} : {id: '7', age: 'oops'};
  const checkedId = frame >= (corrected ? 205 : 60);
  const checkedAge = frame >= (corrected ? 235 : 100);
  const validId = typeof raw.id === 'number';
  const validAge = typeof raw.age === 'number';
  return {
    raw, corrected, checkedId, checkedAge, validId, validAge,
    rejected: frame >= 140 && frame < 175,
    service: checkedId && checkedAge && validId && validAge && frame >= 265 ? {id: Number(raw.id), age: Number(raw.age)} : null,
  };
};
