import { Injectable, ConsoleLogger } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  async logToFile(entry: any) {
    const FormattedEntry = `${Intl.DateTimeFormat('en-Us', {
      dateStyle: 'short',
      timeStyle: 'medium',
      timeZone: 'America/New_York',
    }).format(new Date())}\t${entry}\n`;

    try {
      if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
        await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'));
      }
      await fsPromises.appendFile(
        path.join(__dirname, '..', '..', 'logs', 'MyAppLogFile.log'),
        FormattedEntry,
      );
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  }

  log(message: any, context?: string) {
    const entry = `${context}\t ${message}`;
    this.logToFile(entry);
    super.log(message, context);
  }

  error(message: any, stackOrContext?: string) {
    const entry = `${stackOrContext}\t ${message}`;
    this.logToFile(entry);
    super.error(message, stackOrContext);
  }
}
