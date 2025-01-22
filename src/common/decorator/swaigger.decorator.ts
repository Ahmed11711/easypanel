import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

interface ResponseOptions {
  status: number;
  description: string;
}

export function ApiGlobalResponse(
  operationDescription: string,
  customResponses: ResponseOptions[] = [],
) {
  // Default responses that apply to all endpoints
  const defaultResponses = [
    // { status: 200, description: 'Request successful.' },
    { status: 201, description: 'Resource created successfully.' },
    { status: 400, description: 'Bad Request.' },
    { status: 401, description: 'Unauthorized.' },
    { status: 403, description: 'Forbidden.' },
    { status: 500, description: 'Internal Server Error.' },
  ];

  // Merge default responses with any custom responses passed in
  const mergedResponses = [...defaultResponses, ...customResponses];

  return applyDecorators(
    ApiOperation({ summary: operationDescription }),
    ...mergedResponses.map((response) =>
      ApiResponse({
        status: response.status,
        description: response.description,
      }),
    ),
  );
}
