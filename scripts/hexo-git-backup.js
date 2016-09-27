'use strict';

var fs = require('hexo-fs');
var chalk = require('chalk');
var swig = require('swig');
var moment = require('moment');
var Promise = require('bluebird');
var spawn = require('hexo-util/lib/spawn');
var parseConfig = require('./parse_config');

var args = {
    'm': '',
    'silent': true,
    'repo': 'git@github.com:ivince/ivince.github.io.git',
    'branch': 'hexo'
}

var swigHelpers = {
  now: function(format) {
    return moment().format(format);
  }
};

try {
    hexo.on('deployAfter', function() {
        push();
    });
} catch (e) {
    console.log("error：" + e.toString());
}

var push = function() {
  var baseDir = hexo.base_dir;
  var deployDir = baseDir;
  var log = hexo.log;
  var message = commitMessage(args);
  var verbose = !args.silent;

  if (!args.repo && process.env.HEXO_DEPLOYER_REPO) {
    args.repo = process.env.HEXO_DEPLOYER_REPO;
  }

  if (!args.repo && !args.repository) {
    var help = '';

    help += 'You have to configure the deployment settings in _config.yml first!\n\n';
    help += 'Example:\n';
    help += '  deploy:\n';
    help += '    type: git\n';
    help += '    repo: <repository url>\n';
    help += '    branch: [branch]\n';
    help += '    message: [message]\n\n';
    help += '    extend_dirs: [extend directory]\n\n';
    help += 'For more help, you can check the docs: ' + chalk.underline('http://hexo.io/docs/deployment.html');

    console.log(help);
    return;
  }

  function git() {
    var len = arguments.length;
    var args = new Array(len);

    for (var i = 0; i < len; i++) {
      args[i] = arguments[i];
    }

    return spawn('git', args, {
      cwd: deployDir,
      verbose: verbose
    });
  }

  function push(repo) {
    return git('add', '-A').then(function() {
      return git('commit', '-m', message).catch(function() {
        // Do nothing. It's OK if nothing to commit.
      });
    }).then(function() {
      return git('push', '-u', repo.url, 'HEAD:' + repo.branch);
    });
  }

  fs.exists(deployDir).then(function(exist) {
    if (exist) return;

    log.info('please "git init" in your base_dir ...');
  }).then(function() {
    return parseConfig(args);
  }).each(function(repo) {
    return push(repo);
  });
};

function commitMessage(args) {
  var message = args.m || args.msg || args.message || 'Site updated: {{ now(\'YYYY-MM-DD HH:mm:ss\') }}';
  return swig.compile(message)(swigHelpers);
}
