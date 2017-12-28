@ECHO OFF
IF [%1]==[] (
	ECHO ****************
	ECHO Missing argument 
	ECHO ****************
	GOTO END
	)

git add --all
git commit -m%1
git push

ECHO Done!

:END