const points_correct_team = 3;
const points_correct_score = 2;
class prediction {
    /**
     * Prediction class
     * @param {String} t1 
     * @param {String} t2 
     * @param {String} s1 
     * @param {String} s2 
     * @param {number} uid
     */
    constructor(t1, t2, s1, s2, uid = 0) {
        if (t1 > t2) {
            this.t1 = t2
            this.t2 = t1
            this.s1 = s2
            this.s2 = s1
        } else {
            this.t1 = t1
            this.t2 = t2
            this.s1 = s1
            this.s2 = s2
        }
        this.uid = uid
    }
    /**
     * Compares a prediction to the actual result of the match
     * @param {prediction} other compares this prediction with the actual result of the match
     * @returns {number} returns the number of points the user gets for this prediction
     */
    compare(other) {
        if (!(other instanceof prediction)) {
            return -1;
        }
        else if (!(this.t1 === other.t1 && this.t2 === other.t2)) {
            return -1;
        }
        let points = 0;
        if (this.s1 > this.s2) {
            if (other.s1 > other.s2) {
                points += points_correct_team;
            }
        } else {
            if (other.s1 < other.s2) {
                points += points_correct_team;
            }
        }
        if (this.s1 === other.s1 && this.s2 === other.s2) {
            points += points_correct_score;
        }
        return points;
    }
    save() {
        // TODO
    }
    update(other) {
        // TODO
    }
}
module.exports = prediction;