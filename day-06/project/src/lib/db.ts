// 11.2

export default function getAttendance(
  id: number
): Promise<number> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const attendance: Record<
        number,
        number
      > = {
        1: 95,
        2: 82,
        3: 90
      };

      const value = attendance[id];

      if (value === undefined) {
        reject(
          new Error(
            `Attendance not found for student ${id}`
          )
        );

        return;
      }

      resolve(value);
    }, 500);
  });
}