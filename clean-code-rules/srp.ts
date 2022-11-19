export const assignToNeighboursQuality = (
  group: IGroup,
  rooms: IRoom[],
  { ...inputProps }: IQualityPropsForQuality
) => {
  const inputPropsTemp = { ...inputProps };
  let availableRooms = rooms.filter((room: IRoom) => !inputPropsTemp.assignedRoomsNumbers.includes(room.number));
  availableRooms = availableRooms.filter((room: IRoom) => room.beds < group.members.length);
  let assignment: IAssignmentDictionary | null = null;
  const assignedNumbers: string[] = [];
  const foundSmallerWithNeighbours = [...Array.from(Array(availableRooms.length + 1).keys()).slice(2)].some((i) => {
    let currentDepthGroups: IRoomsGroupWithNeighbours[] = [];
    availableRooms.forEach((rm: IRoom) => {
      const configuartions = getAllRoomWithNeigboursConfigurations(rm, i, availableRooms);
      configuartions.forEach((conf: IRoom[]) => {
        const bedsInGroup = conf.reduce((acc, room: IRoom) => acc + room.beds, 0);
        if (conf.length === i && bedsInGroup >= group.members.length) {
          currentDepthGroups.push({ rooms: conf, bedsAmmount: bedsInGroup });
        }
      });
    });
    if (currentDepthGroups.length > 0) {
      currentDepthGroups = eliminateDuplicatesOfRoomGroups(sortArrayOfRoomGroupsByNumbers(currentDepthGroups));
      currentDepthGroups = sortArrayOfRoomGroupsByBedsAmmount(currentDepthGroups);
      assignment = {
        group,
        rooms: currentDepthGroups[0].rooms,
      } as IAssignmentDictionary;
      assignedNumbers.push(...currentDepthGroups[0].rooms.map((rm) => rm.number));
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
    inputPropsTemp.assignedRoomsNumbers = inputPropsTemp.assignedRoomsNumbers.concat(assignedNumbers);
    inputPropsTemp.assigned = true;
  }
  return inputPropsTemp;
};
