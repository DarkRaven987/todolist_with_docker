import Joi = require('joi');

export const updateTodoStatusSchema = Joi.object({
  todoId: Joi.number().required().messages({
    'number.base': `"todoId" field should be of type "number"`,
    'number.required': '"todoId" field is required',
  }),
  status: Joi.number().required().messages({
    'number.base': `"status" field should be of type "number"`,
    'number.required': '"status" field is required',
  }),
});

export class updateTodoStatusDto {
  todoId: number;
  status: number;
}

export const createTodoSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.base': `"title" field should be of type "string"`,
    'string.required': '"title" field is required',
  }),
  description: Joi.string().messages({
    'string.base': '"description" field should be of type "string"',
  }),
});

export class createTodoDto {
  title: string;
  description: string;
}

export const deleteTodoSchema = Joi.object({
  todoId: Joi.number().required().messages({
    'number.base': `"todoId" field should be of type "number"`,
    'number.required': '"todoId" field is required',
  }),
});

export class deleteTodoDto {
  todoId: number;
}

export const updateTodoSchema = Joi.object({
  todoId: Joi.number().required().messages({
    'number.base': `"todoId" field should be of type "number"`,
    'number.required': '"todoId" field is required',
  }),
  title: Joi.string().required().messages({
    'string.base': `"title" field should be of type "string"`,
    'string.required': '"title" field is required',
  }),
  description: Joi.string().allow('').messages({
    'string.base': '"description" field should be of type "string"',
  }),
});

export class updateTodoDto {
  todoId: number;
  title: string;
  description: string;
}
