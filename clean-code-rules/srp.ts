export const assignmentQuality = (
  group: IGroup,
  boxes: IBox[],
  { ...inputProps }: IQualityPropsForQuality
) => {
  const inputPropsTemp = { ...inputProps };
  let availableRooms = boxes.filter((box: IBox) => !inputPropsTemp.assignedBoxesNumber.includes(box.number));
  availableRooms = availableRooms.filter((box: IBox) => box.capacity < group.package.length);
  let assignment: IAssignmentDictionary | null = null;
  const assignedNumbers: string[] = [];
  const foundSmallerWithNeighbours = [...Array.from(Array(availableRooms.length + 1).keys()).slice(2)].some((i) => {
    let currentDepthGroups: IBoxsGroupWithNeighbours[] = [];
    availableRooms.forEach((rm: IBox) => {
      const configuartions = getAllBoxesWithNeighboursConfiguration(rm, i, availableRooms);
      configuartions.forEach((conf: IBox[]) => {
        const capacityInGroup = conf.reduce((acc, box: IBox) => acc + box.capacity, 0);
        if (conf.length === i && capacityInGroup >= group.package.length) {
          currentDepthGroups.push({ boxes: conf, capacityAmmount: capacityInGroup });
        }
      });
    });
    if (currentDepthGroups.length > 0) {
      currentDepthGroups = eliminateDuplicatesOfB(sortArrayOfBoxesByNumbers(currentDepthGroups));
      currentDepthGroups = sortArrayOfBoxesByCapacity(currentDepthGroups);
      assignment = {
        group,
        boxes: currentDepthGroups[0].boxes,
      } as IAssignmentDictionary;
      assignedNumbers.push(...currentDepthGroups[0].boxes.map((rm) => rm.number));
      return true;
    }
    return false;
  });
  if (!foundSmallerWithNeighbours) {
    inputPropsTemp.stage = "no-nghs";
  } else if (assignment) {
    inputPropsTemp.quality += WEIGHTS.NGHS / (assignedNumbers.length * 1.0);
    const stageAssignment: IStageAssignments = {
      stage: "nghs",
      assignemnt: assignment,
    };
    inputPropsTemp.stageAssignments.push(...assignedNumbers);
    inputPropsTemp.assignedBoxesNumber = inputPropsTemp.assignedBoxesNumber.concat(assignedNumbers);
    inputPropsTemp.assigned = true;
  }
  return inputPropsTemp;
};
