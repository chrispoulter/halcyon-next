import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { Resource } from '@opentelemetry/resources';
import {
    ConsoleSpanExporter,
    SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import {
    ATTR_SERVICE_NAME,
    ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';
import { config } from '@/lib/config';

// Configure the exporter for OTLP (HTTP)
const otlpExporter = new OTLPTraceExporter({
    url: 'http://localhost:5341/ingest/otlp/v1/traces', // Change this to match your Seq ingestion endpoint
    headers: {}, // Add auth headers if needed
});

// Define the OpenTelemetry provider with span processors
const provider = new WebTracerProvider({
    resource: new Resource({
        [ATTR_SERVICE_NAME]: 'halcyon',
        [ATTR_SERVICE_VERSION]: config.PACKAGE_VERSION,
    }),
    spanProcessors: [
        new SimpleSpanProcessor(new ConsoleSpanExporter()), // Logs to console
        new SimpleSpanProcessor(otlpExporter), // Sends to Seq
    ],
});

// Register provider and instrumentations
provider.register();

registerInstrumentations({
    instrumentations: [
        new FetchInstrumentation(),
        new XMLHttpRequestInstrumentation(),
    ],
});

console.log('OpenTelemetry initialized.');
