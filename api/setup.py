from setuptools import find_packages, setup

# The purpose of this file is to describe the project and the files that belong
# to it. By using packages we don't need to manually list all files in the
# project, however that are some that will be missed, so we need to list them
# in MANIFEST.in

setup(
    name='flask_api',
    version='1.0.0',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'flask',
    ],
)