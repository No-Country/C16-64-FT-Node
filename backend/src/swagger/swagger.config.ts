import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

class SwaggerInit {
  private document: OpenAPIObject;
  constructor(app: INestApplication) {
    this.document = SwaggerModule.createDocument(app, this.config);
    this.init(app);
  }

  private init(app: INestApplication) {
    SwaggerModule.setup('api-docs', app, this.document);
  }

  public config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('DiNERO GESTOR API')
    .setDescription('Wellcome to finance manager API')
    .setVersion('3.0')
    .addServer('https://backend-finance-managegr.onrender.com')
    .addServer('http://localhost:8000')
    .setExternalDoc(
      'Repository',
      'https://github.com/No-Country/C16-64-FT-Node/commits/backend/',
    )
    .addBearerAuth()
    .addTag('auth', 'auth endpoints')
    .addTag('users', 'user endpoints')
    .build();
}
export default SwaggerInit;
