import mongoose, { Schema, Document } from 'mongoose';

interface ITodo extends Document {
    taskName: string;
    description: string;
    dueDate: Date;
    priorityLevel: PriorityLevel;
    status: Status;
    user: Schema.Types.ObjectId;
}

enum PriorityLevel {
    High = 'high',
    Medium = 'medium',
    Low = 'low',
}

enum Status {
    NotStarted = 'not_started',
    InProgress = 'in_progress',
    Completed = 'completed',
}

const todoSchema: Schema = new Schema({
    taskName: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    priorityLevel: { 
        type: String, 
        required: true,
        enum: Object.values(PriorityLevel),
    },
    status: { 
        type: String, 
        required: true,
        enum: Object.values(Status),
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Todo = mongoose.model<ITodo>('Todo', todoSchema);

export default Todo;
