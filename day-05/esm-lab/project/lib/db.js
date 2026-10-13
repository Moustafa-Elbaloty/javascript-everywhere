// 7.2 db

const attendance = {
    1: 95,
    2: 88,
    3: 92
};

function getAttendance(id) {
    const delay = id === 1 ? 100 : id === 2 ? 200 : 300;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id === 3) {
                reject(new Error(`Attendance not found for student ${id}`));
                return;
            }

            resolve(attendance[id]);
        }, delay);
    });
}

export default getAttendance;