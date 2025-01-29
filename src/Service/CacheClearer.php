<?php

namespace App\Service;

//use Symfony\Component\Filesystem\Filesystem;
//use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class CacheClearer
{
    public function __construct(/*private KernelInterface $kernel, private Filesystem $filesystem*/)
    {
    }

    public function cacheClear(): void
    {
//        $cacheDir = $this->kernel->getCacheDir();
//        $this->filesystem->remove($cacheDir);

        $process = new Process(['php', '../bin/console', 'cache:clear']);
        $process->run();

        // Check if the process was successful
        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        // Rebuild the cache
        $process = new Process(['php', '../bin/console', 'cache:warmup']);
        $process->run();

        // Check if the process was successful
        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }
    }
}