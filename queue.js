class Queue {
    constructor(fixed_length, rate_limit_time) {
        this.elements = {};
        this.head = 0;
        this.tail = 0;
        this.queue_length = 0;
        this.FIXED_LENGTH = fixed_length;
        this.RATE_LIMIT_TIME = rate_limit_time;
    };
  
    // add element to queue and increase tail
    enqueue(element) {
        this.head = this.head%this.FIXED_LENGTH;
        this.tail = this.tail%this.FIXED_LENGTH;
        if (this.queue_length < this.FIXED_LENGTH) {
            this.elements[this.tail] = element;
            this.tail++;
            this.queue_length += 1;
            return { success: true, time: 0}
        } else {
            let first_req_time = this.elements[this.head];
            if ((Date.now() - first_req_time) > this.RATE_LIMIT_TIME) {
                this.dequeue();
                this.elements[this.tail] = Date.now();
                this.tail++;
                return { success: true, time: 0}
            } else {
                let wait_time = this.RATE_LIMIT_TIME - (Date.now() - this.elements[this.head]);
                return { success: false, time: wait_time}
            }
        }
    }

    //return head item and increase head by 1
    dequeue() {
        const item = this.elements[this.head];
        delete this.elements[this.head];
        this.head++;
        return item;
    };

};
  
export default Queue;
