import { SimpleGit } from 'simple-git';
import { assertExecutedTasksCount, newSimpleGit, wait } from './__fixtures__';

const {restore} = require('./include/setup');

describe('cwd', () => {

   let git: SimpleGit;

   const { $fails: isInvalidDirectory, $reset: isValidDirectory } = require('@kwsites/file-exists');

   beforeEach(() => {git = newSimpleGit()});

   afterEach(() => restore());

   it('to a known directory', async () => {
      isValidDirectory();

      const callback = jest.fn();
      git.cwd('./', callback);

      await wait();
      expect(callback).toHaveBeenCalledWith(null, './');
      assertExecutedTasksCount(0);
   });

   it('to an invalid directory', async () => {
      isInvalidDirectory();

      const callback = jest.fn((err) => expect(err.message).toMatch('invalid_path'));
      git.cwd('./invalid_path', callback);

      await wait();
      expect(callback).toHaveBeenCalledWith(expect.any(Error), );
      assertExecutedTasksCount(0);
   });

});
